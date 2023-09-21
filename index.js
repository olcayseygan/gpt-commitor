#!/usr/bin/env node
import { execSync } from "child_process";
import enquirer from "enquirer";
import ora from "ora";
import "./bootstrap.js";
import { GIT_COMMIT_COMMAND, GIT_DIFF_COMMAND, GIT_PUSH_COMMAND } from "./config.js";
import fecthMessages from "./openai.js";

try {
  const spinner = ora();
  spinner.start("Getting commit messages from OpenAI...");
  var gitDiff = "";
  try {
    gitDiff = execSync(GIT_DIFF_COMMAND, { encoding: "utf-8" }).toString();
  } catch {
    spinner.stop();
    console.log("You have no staged file in your git directory.");
    process.exit(1);
  }
  const messages = (await fecthMessages(gitDiff.substring(0, 2000))).split("\n").map((message) => message.trim());
  spinner.stop();

  const prompt = new enquirer.Select({
    name: "message",
    message: "Please select commit message below.",
    choices: messages,
  });

  prompt
    .run()
    .then((answer) => {
      execSync(GIT_COMMIT_COMMAND.replace("{0}", answer), { encoding: "utf-8" });
      execSync(GIT_PUSH_COMMAND, { encoding: "utf-8" });
      console.log("Committed.");
    })
    .catch(console.error);
} catch (err) {
  console.error(err);
}
