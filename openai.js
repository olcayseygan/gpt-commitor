import OpenAI from "openai";
import { MAX_TOKENS, MODEL, OPENAI, SYSTEM_PROMPT, TEMPERATURE } from "./config.js";

var openai = null;

export default async function fecthMessages(gitDiff) {
  if (openai == null) {
    openai = new OpenAI({
      apiKey: OPENAI.apikey,
    });
  }

  const completion = await openai.chat.completions.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    temperature: TEMPERATURE,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: gitDiff },
    ],
  });

  return completion.choices[0].message.content;
}
