import fs from "fs";
export function readFiles(url) {
  let data = null;
  try {
    data = fs.readFileSync(url, "utf8");
  } catch (err) {
    console.error(err);
  }
  return data;
}
