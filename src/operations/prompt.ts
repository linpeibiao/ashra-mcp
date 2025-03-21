import { z } from "zod";
import { ashraRequest } from "../common/utils.js";
import {
  CreatePromptRequestSchema,
  CreatePromptResponseSchema,
} from "../common/types.js";

export async function Create(
  params: z.infer<typeof CreatePromptRequestSchema>
) {
  const { url, prompt, schema, options } =
    CreatePromptRequestSchema.parse(params);
  const response = await ashraRequest(`https://api.ashra.ai/prompt`, {
    method: "POST",
    body: { url, prompt, schema, options },
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 725d7775c201edf2b9d92f09a0ae2d8592f63ed5c6b40e0cc283b5e520f3af2ba6e8f512cabd5a6841cef4c1ce6ee93a`,
    },
  });
  return CreatePromptResponseSchema.parse(response);
}
