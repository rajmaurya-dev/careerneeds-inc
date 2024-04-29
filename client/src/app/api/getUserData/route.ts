
import { User } from "@/model/UserData";
import { connectDb } from "@/utils/db";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request, res: Response) {
    try {
        
        const user = auth();

        await connectDb();
        const UserData = await User.find({id: user.userId});

        
        return new Response(JSON.stringify(UserData), { status: 200 });
    } catch (error) {
        return new Response("error", { status: 500 });
    }
   
}