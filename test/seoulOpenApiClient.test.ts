import { describe, expect, test } from "vitest";
import { SeoulOpenApiClient } from "../src/services/seoulOpenApiClient.js";

describe("SeoulOpenApiClient", () => {
  test("builds Seoul OpenAPI URLs with JSON response format and pagination range", () => {
    const client = new SeoulOpenApiClient({
      apiKey: "test-key",
      baseUrl: "http://openapi.seoul.go.kr:8088",
    });

    const url = client.buildUrl({
      serviceName: "SearchParkInfoService",
      startIndex: 1,
      endIndex: 5,
    });

    expect(url.toString()).toBe(
      "http://openapi.seoul.go.kr:8088/test-key/json/SearchParkInfoService/1/5/",
    );
  });

  test("rejects invalid pagination ranges before making requests", () => {
    const client = new SeoulOpenApiClient({
      apiKey: "test-key",
      baseUrl: "http://openapi.seoul.go.kr:8088",
    });

    expect(() =>
      client.buildUrl({
        serviceName: "SearchParkInfoService",
        startIndex: 10,
        endIndex: 1,
      }),
    ).toThrow("endIndex must be greater than or equal to startIndex");
  });
});
