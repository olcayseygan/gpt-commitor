import enquirer from "enquirer";
import fs from "fs";
import path from "path";
import { WORKING_DIRECTORY } from "./config.js";

const GPT_COMMITOR_JSON_PATH = path.join(WORKING_DIRECTORY, ".gpt-commitor.json");
const json = JSON.parse(fs.readFileSync(GPT_COMMITOR_JSON_PATH).toString());
if (!("apikey" in json)) {
  var apikey = "";
  try {
    const answer = await enquirer.prompt({
      type: "password",
      name: "api_key",
      message: "Enter you OpenAI API-KEY",
    });

    apikey = answer.api_key;
  } catch {}

  if (json.apikey === "") {
    console.error("You must give an api key to go next.");
    process.exit(1);
  }

  json.apikey = apikey;
  fs.writeFileSync(GPT_COMMITOR_JSON_PATH, JSON.stringify(json, null, 2).toString());
}
