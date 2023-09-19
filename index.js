import { execSync } from "child_process";

try {
  const gitDiff = execSync('git diff -U0 | findstr -r "^[+-]" | findstr -v "^---"', { stdio: "ignore", encoding: "utf-8" }).toString();
  console.log(gitDiff);
} catch (err) {
  console.error(err);
}
