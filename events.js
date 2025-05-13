import fs from "fs";
import { EventEmitter } from "events";
import path from "path";

const filePath = "./text.txt";

class Emitter extends EventEmitter {}
const emitter = new Emitter();

emitter.on("checkFile", () => {
  if (!filePath.endsWith(".txt")) {
    console.log("file doesn't exist");
    return;
  }
  emitter.emit("countWords");
});

emitter.on("countWords", () => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const wordCount = data.trim().split(/\s+/).length;
    console.log(`${wordCount}`);
  });
});

emitter.on("printContent", () => {
  const fileName = path.basename(filePath);
  console.log(fileName);
});

emitter.emit("checkFile", filePath);
