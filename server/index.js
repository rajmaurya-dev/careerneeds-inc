import "dotenv/config";

import express from "express";
import cors from "cors";
import videoController from "./controller/video.js";
import textToSpeechController from "./controller/textToSpeech.js";
import audioController from "./controller/audio.js";
import { createUploadthingExpressHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing.js";
import { connectDb } from "./utils/db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", videoController);
app.use("/api", textToSpeechController);
app.use("/api", audioController);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(
  "/api/uploadthing",
  createUploadthingExpressHandler({
    router: uploadRouter,
  })
);

app.get("/", (req, res) => {
  res.json("test ok");
});

app.listen(4000, () => {
  console.log(`Server is working on port:${process.env.PORT || 4000}`);
  connectDb();
});
