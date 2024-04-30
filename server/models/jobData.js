import { Schema, model } from "mongoose";

const JobDataSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String },
  skills: { type: [String] },
  voiceover: { type: String, required: true },
  imageUrl: { type: String },
  videoUrl: { type: String },
});

const JobData = model("JobData", JobDataSchema);

export { JobData };
