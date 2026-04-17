import { z } from "zod";

export const SeoulOpenApiFetchInputShape = {
  serviceName: z
    .string()
    .regex(/^[A-Za-z0-9_]+$/)
    .describe("Seoul OpenAPI service name, for example SearchParkInfoService."),
  startIndex: z
    .number()
    .int()
    .min(1)
    .default(1)
    .describe("Start row number. Seoul OpenAPI uses 1-based ranges."),
  endIndex: z
    .number()
    .int()
    .min(1)
    .max(1000)
    .default(10)
    .describe("End row number. Keep ranges focused for MCP context."),
  pathParams: z
    .array(z.string().min(1).max(200))
    .max(10)
    .default([])
    .describe("Optional extra path parameters required by some services."),
};

export const SeoulOpenApiFetchInputSchema = z
  .object(SeoulOpenApiFetchInputShape)
  .strict()
  .refine((value) => value.endIndex >= value.startIndex, {
    message: "endIndex must be greater than or equal to startIndex",
    path: ["endIndex"],
  });

export const SeoulOpenApiFetchOutputSchema = z.object({
  serviceName: z.string(),
  startIndex: z.number().int(),
  endIndex: z.number().int(),
  data: z.unknown(),
});

export type SeoulOpenApiFetchInput = z.infer<
  typeof SeoulOpenApiFetchInputSchema
>;
export type SeoulOpenApiFetchOutput = z.infer<
  typeof SeoulOpenApiFetchOutputSchema
>;
