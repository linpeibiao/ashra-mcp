import { z } from "zod";

export const CreatePromptRequestSchema = z.object({
  "url": z.string().describe("The URL of the prompt"),
  "prompt": z.string().describe("The prompt to create"),
  "schema": z.object({
    "type": z.enum(["object"]),
    "properties": z.record(
      z.string(),
      z.object({
        "type": z.enum(["array"]),
        "description": z.string().describe("The description of the array"),
        "items": z.object({
          "type": z.enum(["object"]),
          "properties": z.array(
            z.record(
              z.string().describe("The name of the property"),
              z.object({
                "type": z.string().describe("The type of the property"),
                "description": z.string().describe("The description of the property"),
              }),
            ),
          ),
          "required": z.array(z.string()),
          "additionalProperties": z.boolean().optional().default(false),
        }),
      }),
    ),
    "required": z.array(z.string()),
    "additionalProperties": z.boolean().optional().default(false),
  }),
  "options": z.object({
    "deep": z.boolean().optional().default(false),
    "maxPages": z.number().optional().default(1),
  }),
});

export const CreatePromptResponseSchema = z.object({
  success: z.boolean(),
  data: z.record(
    z.string(),
    z.array(
      z.record(
        z.string(),
        z.any(),
      ),
    ),
  ),
});
