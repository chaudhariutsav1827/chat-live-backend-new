import path from "path";
import fs from "fs";

const logsDir = path.join("logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFileName = "access.log";
const logOptions = {
  flags: "a",
};

export const accessLogStream = fs.createWriteStream(
  path.join(logsDir, logFileName),
  logOptions
);
