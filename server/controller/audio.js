import express from "express";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.post("/addAudioToVideo", async (req, res) => {
  try {
    const videoFilePath = path.join(__dirname, "..", "videos", "carr.mp4");
    const outputFolderPath = path.join(__dirname, "..", "output");
    const timestamp = new Date().toISOString().replace(/[-:]/g, "");
    const outputFileName = `output_${timestamp}.mp4`;

    const outputFile = path.join(outputFolderPath, outputFileName);

    const inputFile = videoFilePath;
    const audioFilePath = path.join(__dirname, "..", "audio", "output.mp3");

    if (!fs.existsSync(audioFilePath)) {
      return res.status(404).json({ error: "Audio file not found." });
    }

    const ffmpegCommand = ffmpeg(inputFile);
    ffmpegCommand.input(audioFilePath).outputOptions("-shortest");

    ffmpegCommand
      .on("end", () => {
        const outputBuffer = fs.readFileSync(outputFile);
        res.set("Content-Type", "video/mp4");
        res.send(outputBuffer);
        console.log("output sent");
      })
      .on("error", (err) => {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal server error." });
      })
      .save(outputFile);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
