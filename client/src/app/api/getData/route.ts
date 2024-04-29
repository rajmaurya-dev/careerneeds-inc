import { JobData } from "@/model/JobsData";
import { connectDb } from "@/utils/db";

export async function GET(req: Request, res: Response) {
    try {
        await connectDb();
        const allJobData = await JobData.find({
            videoUrl: {
              $ne: '', // Ensure videoUrl is not empty
              $not: { $regex: 'output_20240120T203' } // Exclude URLs containing 'output_20240120T203'
            }
          });
          

        return new Response(JSON.stringify(allJobData), { status: 200 });
    } catch (error) {
        return new Response("error", { status: 500 });
    }
   
}