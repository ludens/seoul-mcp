import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SeoulOpenApiClient } from "../services/seoulOpenApiClient.js";
import {
  SeoulOpenApiFetchInputShape,
  SeoulOpenApiFetchInputSchema,
  SeoulOpenApiFetchOutputSchema,
  type SeoulOpenApiFetchOutput,
} from "../schemas/seoulOpenApiSchemas.js";

export function registerOpenApiTools(
  server: McpServer,
  client: SeoulOpenApiClient,
): void {
  server.registerTool(
    "seoul_openapi_fetch_json",
    {
      title: "Fetch Seoul OpenAPI JSON",
      description: `Fetch JSON from any Seoul Open Data OpenAPI service by service name and row range.

Use this for read-only exploration of Seoul public datasets before specialized tools exist.

Args:
  - serviceName: Seoul OpenAPI service name, for example SearchParkInfoService
  - startIndex: 1-based start row number
  - endIndex: 1-based end row number, max 1000
      - pathParams: optional extra path parameters for APIs that need them

Returns structured JSON containing serviceName, requested range, and raw Seoul OpenAPI response data.

Errors guide next steps when pagination, service name, API key, or HTTP response fails.`,
      inputSchema: SeoulOpenApiFetchInputShape,
      outputSchema: SeoulOpenApiFetchOutputSchema.shape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (rawParams) => {
      const params = SeoulOpenApiFetchInputSchema.parse(rawParams);
      const data = await client.fetchJson(params);
      const output: SeoulOpenApiFetchOutput = {
        serviceName: params.serviceName,
        startIndex: params.startIndex,
        endIndex: params.endIndex,
        data,
      };

      return {
        content: [{ type: "text", text: JSON.stringify(output, null, 2) }],
        structuredContent: output,
      };
    },
  );
}
