import { handleCsv, handleJson } from "./parseCsv.js";
import { readFiles } from "./readFiles.js";

async function loadFiles(file) {
  const data = readFiles(file.path);

  switch (file.mimetype) {
    case "text/csv":
      await handleCsv(data);
      break;
    case "application/json":
      handleJson(data);
      break;
    default:
      return;
  }
}

export { loadFiles };
