import { auth } from "@clerk/nextjs";
import axios from "axios";

export async function POST(req: Request, res: Response) {
    try {
        const { username } = await req.json();
        const { userId } = auth();
        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }
        if (!username) {
            return new Response("Username is required", { status: 400 });
        }
        const APIURL = `https://api.github.com/users/${username}`;
        try {
            const { data } = await axios.get(APIURL, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB}`,
                },
            });
            return new Response(JSON.stringify(data), { status: 200 });
        } catch (error) {
            console.error("GitHub API error:", error);
            return new Response("Error fetching GitHub data", { status: 500 });
        }
    } catch (error) {
        console.error("Internal error:", error);
        return new Response("Internal server error", { status: 500 });
    }
}