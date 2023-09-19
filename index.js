import { execSync } from "child_process";
import enquirer from "enquirer";
import "./bootstrap.js";
import { COMMAND } from "./config.js";
import fecthMessages from "./openai.js";

try {
  const gitDiff = execSync(COMMAND, { encoding: "utf-8" }).toString();
  const messages = (await fecthMessages(gitDiff.substring(0, 2000))).split("\n").map((message) => message.substring(4).trim());
  const prompt = new enquirer.Select({
    name: "message",
    message: "Please select commit message below.",
    choices: messages,
  });

  prompt
    .run()
    .then((answer) => {
      execSync(`git commit -m "${answer}"`, {
        stdio: "inherit",
      });
    })
    .catch(console.error);
} catch (err) {
  console.error(err);
}
