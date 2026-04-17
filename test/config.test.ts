import { describe, expect, test } from "vitest";
import { loadConfig } from "../src/config.js";

describe("loadConfig", () => {
  test("loads Seoul OpenAPI settings from environment values", () => {
    const config = loadConfig({
      SEOUL_OPENAPI_KEY: "abc123",
      SEOUL_OPENAPI_BASE_URL: "https://example.test",
    });

    expect(config.seoulOpenApi.apiKey).toBe("abc123");
    expect(config.seoulOpenApi.baseUrl).toBe("https://example.test");
  });

  test("throws an actionable error when API key is missing", () => {
    expect(() => loadConfig({})).toThrow(
      "Set SEOUL_OPENAPI_KEY before starting seoul-openapi-mcp-server.",
    );
  });
});
