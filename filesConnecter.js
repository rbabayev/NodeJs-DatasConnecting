import fs from "fs";

const paths = ["./text.txt", "./text2.txt", "./text3.txt"];

paths.forEach((paths) => {
  const readFiles = fs.createReadStream(paths, { encoding: "utf8" });
  const writeFile = fs.createWriteStream("./totalTexts.txt", {
    flags: "a",
    encoding: "utf-8",
  });

  readFiles.pipe(writeFile);
});
