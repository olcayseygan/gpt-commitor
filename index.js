import { execSync } from "child_process";
import "./bootstrap.js";
import { COMMAND } from "./config.js";
import fecthMessages from "./openai.js";

try {
  const gitDiff = execSync(COMMAND, { encoding: "utf-8" }).toString();
  console.log(await fecthMessages(gitDiff.substring(0, 2000)));
} catch (err) {
  //   console.error(err);
}
