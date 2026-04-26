export interface SeoulOpenApiConfig {
  apiKey: string;
  baseUrl: string;
}

export interface AppConfig {
  seoulOpenApi: SeoulOpenApiConfig;
}

const DEFAULT_SEOUL_OPENAPI_BASE_URL = "http://openapi.seoul.go.kr:8088";

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const apiKey = env.SEOUL_OPENAPI_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "Set SEOUL_OPENAPI_KEY before starting seoul-openapi-mcp.",
    );
  }

  return {
    seoulOpenApi: {
      apiKey,
      baseUrl:
        env.SEOUL_OPENAPI_BASE_URL?.trim() || DEFAULT_SEOUL_OPENAPI_BASE_URL,
    },
  };
}
