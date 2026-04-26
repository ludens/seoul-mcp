import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { AppConfig } from "./config.js";
import { SeoulOpenApiClient } from "./services/seoulOpenApiClient.js";
import { registerOpenApiTools } from "./tools/openApiTools.js";

export function createSeoulOpenApiMcpServer(config: AppConfig): McpServer {
  const server = new McpServer({
    name: "seoul-openapi-mcp",
    version: "0.1.0",
  });

  const client = new SeoulOpenApiClient(config.seoulOpenApi);
  registerOpenApiTools(server, client);

  return server;
}
