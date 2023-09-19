import { execSync } from "child_process";
import enquirer from "enquirer";
import ora from "ora";
import "./bootstrap.js";
import { COMMAND } from "./config.js";
import fecthMessages from "./openai.js";

try {
  const spinner = ora();
  spinner.start("Getting commit messages from OpenAI...");
  var gitDiff = "";
  try {
    gitDiff = execSync(COMMAND, { encoding: "utf-8" }).toString();
  } catch {
    spinner.stop();
    console.log("You have no staged file in your git directory.");
    process.exit(1);
  }
  const messages = (await fecthMessages(gitDiff.substring(0, 2000))).split("\n").map((message) => message.substring(4).trim());
  spinner.stop();

  const prompt = new enquirer.Select({
    name: "message",
    message: "Please select commit message below.",
    choices: messages,
  });

  prompt
    .run()
    .then((answer) => {
      spinner.start("Commiting...");
      execSync(`git commit -m "${answer}"`, { encoding: "utf-8" });
      execSync("git push", { encoding: "utf-8" });
      spinner.stop();
      console.log("Committed.");
    })
    .catch(console.error);
} catch (err) {
  console.error(err);
}
