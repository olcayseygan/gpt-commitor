import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

export const WORKING_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
export const HOME_DIRECTORY = os.homedir();
export const GIT_DIFF_COMMAND = 'git diff --cached -U0 | findstr -r "^[+-]" | findstr -v "^---"';
export const GIT_COMMIT_COMMAND = 'git commit -m "{0}"';
export const GIT_PUSH_COMMAND = "git push";

export const MODEL = "gpt-3.5-turbo";
export const TEMPERATURE = 0.0;
export const MAX_TOKENS = 512;
export const SYSTEM_PROMPT = `
I want you to act as a commit message generator.
I will provide you with information about the task and the prefix for the task code, and I would like you to generate eight appropriate commit message using the conventional commit format.
Do not write any explanations or other words, just reply with the commit message.
Commit message format should be:
<type>: <message>
<type>: <message>
...
`;

const GPT_COMMITOR_JSON_PATH = path.join(HOME_DIRECTORY, ".gpt-commitor.json");
if (!fs.existsSync(GPT_COMMITOR_JSON_PATH)) {
  fs.writeFileSync(GPT_COMMITOR_JSON_PATH, JSON.stringify({}, null, 2));
}

export const OPENAI = JSON.parse(fs.readFileSync(GPT_COMMITOR_JSON_PATH).toString());
