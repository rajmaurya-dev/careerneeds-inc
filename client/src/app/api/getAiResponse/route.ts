import { connectDb } from "@/utils/db";
import axios from "axios";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { JobData } from "@/model/JobsData";

export async function GET(req: Request, res: Response) {
  try {
    //connect to db
    await connectDb();
    let finalresult = [];
    const apiUrl = "https://api.crackeddevs.com/api/get-jobs?limit=30";
    const externalApiResponse = await axios.get(apiUrl, {
      headers: {
        "api-key": `${process.env.CRACKDEVS_API}`, // API KEY HERE
      },
    });
    for (let i = 0; i < 30; i++) {
      let context;
      let stringifiedResult;
      try {
        stringifiedResult = JSON.stringify(
          externalApiResponse.data[i],
          null,
          2
        );
        context = stringifiedResult;
      } catch (error) {
        throw new Error(`Error making API request`);
      }

      // setting up gemini
      if (context) {
        const prompt = `write a voiceover srcipt for a video where the narrator will inform about a job whoes details are give below, give your response in string format and it should be short and full formated, there shoulf be not more than 60 words in your response, your response should not have any weird texts like '/n', it should sound human like ${context}`;

        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // getting response form gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = JSON.stringify(response.text());
        let jsonPrompt = JSON.parse(stringifiedResult);

        // pushing final response to finalresult and database
        finalresult.push(text);

        const existingDoc = await JobData.findOne({ id: jsonPrompt.id });

        if (!existingDoc) {
          try {
            const newJobData = new JobData({
              id: jsonPrompt.id,
              title: jsonPrompt.title,
              company: jsonPrompt.company,
              description: jsonPrompt.description,
              url: jsonPrompt.url,
              voiceover: text,
              skills: jsonPrompt.technologies,
              imageUrl: jsonPrompt.image_url,
              videoUrl: "",
            });
            await newJobData.save();
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    // stringifieng final result
    const ffinalresult = JSON.stringify(finalresult);

    // returning to frontend
    return new Response(ffinalresult, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
