import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const WORKING_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
export const COMMAND = 'git diff --cached -U0 | findstr -r "^[+-]" | findstr -v "^---"';

export const MODEL = "gpt-3.5-turbo";
export const TEMPERATURE = 0.0;
export const MAX_TOKENS = 512;
export const SYSTEM_PROMPT = `
You generate 4 very-short commit message based on the following difference which is the most important as a single sentence.
Do not put any other comment and new line.
Commit message format should be: <type>: <description>.
`;

const GPT_COMMITOR_JSON_PATH = path.join(WORKING_DIRECTORY, ".gpt-commitor.json");
if (!fs.existsSync(GPT_COMMITOR_JSON_PATH)) {
  fs.writeFileSync(GPT_COMMITOR_JSON_PATH, JSON.stringify({}, null, 2));
}

export const OPENAI = JSON.parse(fs.readFileSync(GPT_COMMITOR_JSON_PATH).toString());
