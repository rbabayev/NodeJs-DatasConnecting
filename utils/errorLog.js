import fs from "fs";

export function writeErrorToFile(errorMessage) {
  const fullMessage = `[${errorMessage}\n`;

  fs.appendFile("/log.txt", fullMessage, "utf8", (err) => {
    if (err) {
      console.error("Error while writing to log file:", err);
    }
  });
}
