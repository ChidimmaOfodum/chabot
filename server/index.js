import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { sendMessage } from "./controllers/sendMessage.js";
import { uploadFile } from "./controllers/upload.js";

const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticDir = path.join(__dirname, "..", "client");
const uploads = multer({ dest: __dirname + "/uploads" });

//Initializing express application
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use(express.static(staticDir));

//Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
});
app.post("/upload", uploads.array("files"), uploadFile);
app.post("/message", sendMessage);


app.listen(PORT, () => console.log(`Welcome...! Listening on port ${PORT}`));
