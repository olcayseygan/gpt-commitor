import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const WORKING_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
export const COMMAND = 'git diff -U0 | findstr -r "^[+-]" | findstr -v "^---"';

const GPT_COMMITOR_JSON_PATH = path.join(WORKING_DIRECTORY, ".gpt-commitor.json");
if (!fs.existsSync(GPT_COMMITOR_JSON_PATH)) {
  fs.writeFileSync(
    GPT_COMMITOR_JSON_PATH,
    JSON.stringify(
      {
        model: "gpt-3.5-turbo",
        temperature: 0,
        max_tokens: 256,
        systemPrompt: "You generate a very-short commit message based on the following difference which is the most important as a single sentence. Commit message format should be: <type>[scope]: <description>.",
      },
      null,
      2
    )
  );
}

export const OPENAI = JSON.parse(fs.readFileSync(GPT_COMMITOR_JSON_PATH).toString());
