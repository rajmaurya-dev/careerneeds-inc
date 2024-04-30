import fs from "fs";
import path from "path";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: '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' }); // Ensure you've set up OpenAI API key properly

export async function convertTextToSpeech(voiceover) {
  const audioFilePath = path.resolve("output.mp3"); // Define the path for the output file

  // Generate spoken audio from input text using OpenAI
  const mp3Response = await openai.audio.speech.create({
    model: "tts-1", // Choose "tts-1-hd" for higher quality if needed
    voice: "alloy", // Specify the voice to be used
    input: voiceover, // Use the function's argument for dynamic text input
  });

  // Convert the response to a buffer and write it to a file
  const buffer = Buffer.from(await mp3Response.arrayBuffer());
  await fs.promises.writeFile(audioFilePath, buffer, "binary");

  console.log(`Audio content written to file: ${audioFilePath}`);

  return audioFilePath;
}