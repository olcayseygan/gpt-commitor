import OpenAI from "openai";
import { OPENAI } from "./config.js";

var openai = null;

export default async function fecthMessages(gitDiff) {
  if (openai == null) {
    openai = new OpenAI({
      apiKey: OPENAI.apikey,
    });
  }

  const completion = await openai.chat.completions.create({
    model: OPENAI.model,
    max_tokens: OPENAI.max_tokens,
    temperature: OPENAI.temperature,
    messages: [
      { role: "system", content: OPENAI.systemPrompt },
      { role: "user", content: gitDiff },
    ],
  });

  return completion.choices[0].message.content;
}
