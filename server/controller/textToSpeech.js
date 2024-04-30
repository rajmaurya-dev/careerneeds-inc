import express from "express";
import { exec } from "child_process";
import util from "util";

const router = express.Router();
const execPromise = util.promisify(exec);

router.post("/convertTextToSpeech", async (req, res) => {
  try {
    const { voiceover } = req.body;
    if (!voiceover) {
      return res.status(400).json({ error: "Please provide text to convert." });
    }

    // Replace spaces with underscores for the command
    const sanitizedVoiceover = voiceover.replace(/ /g, '_');

    // Generate WAV file using espeak and convert it to MP3 using ffmpeg
    const command = `espeak "${sanitizedVoiceover}" --stdout | ffmpeg -i - output.mp3`;

    await execPromise(command);

    console.log("Audio content written to file: output.mp3");
    res.status(200).json({ message: "Text successfully converted to speech." });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;