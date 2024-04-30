import express from "express";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { convertTextToSpeech } from "../services/tts.js";
import { connectDb } from "../utils/db.js";
import { JobData } from "../models/jobData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();


router.post("/addTextToVideo", async (req, res) => {
  try {
    connectDb();
    const allJobData = await JobData.find();
    console.log(allJobData);

    const outputFolderPath = path.join(__dirname, "..", "output");
    const videoDirectory = path.join(__dirname, "..", "videos");
    const bucketName = "dashgigs_vids";

    async function processVideo(index) {
      const videoFiles = fs
        .readdirSync(videoDirectory)
        .filter((file) => file.endsWith(".mp4"));

      if (index >= allJobData.length) {
        // All videos processed, end the response
        res.end();
        return;
      }

      const data = allJobData[index];

      const { title, company, voiceover } = data;

      if (!voiceover) {
        return res
          .status(400)
          .json({ error: "Please provide voiceover text." });
      }

      const audioFilePath = await convertTextToSpeech(voiceover);
      console.log("Audio File Path:", audioFilePath);

      if (!audioFilePath) {
        return res
          .status(500)
          .json({ error: "Error converting text to speech." });
      }

      const videoFileName = videoFiles[index % videoFiles.length];
      const videoFilePath = path.join(videoDirectory, videoFileName);

      const timestamp = new Date().toISOString().replace(/[-:]/g, "");
      const outputFileName = `output_${timestamp}_${data._id}.mp4`;
      const outputFile = path.join(outputFolderPath, outputFileName);
      const inputFile = videoFilePath;

      const audioDuration = await getAudioDuration(audioFilePath);

      const numRepeats = Math.ceil(audioDuration / 30);
      const trimmedAudioFilePath = path.join(
        outputFolderPath,
        `trimmed_audio_${timestamp}_${data._id}.aac`
      );

      const trimCommand = ffmpeg(audioFilePath)
        .audioCodec("aac")
        .audioBitrate(192)
        .seekInput(0)
        .duration(30)
        .save(trimmedAudioFilePath);

      trimCommand.on("end", async () => {
        const ffmpegCommand = ffmpeg(inputFile)
          .input(trimmedAudioFilePath)
          .audioCodec("aac")
          .audioBitrate(192);

        let yOffset = 200;
        ffmpegCommand.videoFilters(
          `drawtext=text='${title}':fontsize=25:fontcolor=red:x=(w-text_w)/2:y=${yOffset}:fontfile=${__dirname}/../fonts/nexa.ttf:borderw=2:bordercolor=white`
        );
        yOffset += 80;
        ffmpegCommand.videoFilters(
          `drawtext=text='${company}':fontsize=40:fontcolor=orange:x=(w-text_w)/2:y=${yOffset}:fontfile=${__dirname}/../fonts/nexa.ttf:box=1:boxcolor=white@0.9:boxborderw=2`
        );

        const videoOutputFile = path.join(outputFolderPath, outputFileName);

        ffmpegCommand
          .on("end", async () => {
            const gcsFilePath = `videos/${outputFileName}`;

            // Update the video URL in JobData schema
            const videoUrl = `https://storage.googleapis.com/${bucketName}/${gcsFilePath}`;
            await JobData.findByIdAndUpdate(data._id, { videoUrl });

            const outputBuffer = fs.readFileSync(videoOutputFile);
            res.write(outputBuffer);
            console.log(`Video for ${data._id} sent`);
            fs.unlinkSync(trimmedAudioFilePath);

            // Process the next video
            processVideo(index + 1);
          })
          .on("error", (err) => {
            console.error("Error:", err);
            res.status(500).json({ error: "Internal server error." });
          })
          .save(videoOutputFile);
      });

      trimCommand.on("error", (err) => {
        console.error("Error trimming audio:", err);
        res.status(500).json({ error: "Internal server error." });
      });
    }

    // Start processing the first video
    processVideo(0);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

async function getAudioDuration(audioFilePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(audioFilePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata.format.duration);
      }
    });
  });
}

export default router;
