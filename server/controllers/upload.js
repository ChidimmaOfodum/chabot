import { loadFiles } from "../lib/loadFile.js";

// uploads file to the upload folder
async function uploadFile(req, res) {
    try {
        if (req.files) {
            const files = req.files;
            for (let file of files) {
                await loadFiles(file);
                res.status(200).json({
                    message: "files uploaded successfully",
                });
            }
        } else {
            res.status(400).json({ err: "No file uploaded" });
        }
    } catch (err) {
        res.status(500).json({ err: "Something went wrong" });
    }
}

export { uploadFile };
