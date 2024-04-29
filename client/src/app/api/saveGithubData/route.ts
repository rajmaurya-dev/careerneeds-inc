import { User } from "@/model/UserData";
import { connectDb } from "@/utils/db";

export async function POST(req: Request, res: Response) {
    try {
        const { data } = await req.json();
        const { username, userId, data: userData } = data;

        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }
        if (!username) {
            return new Response("Username is required", { status: 400 });
        }
        await connectDb();
        if (!userData) {
            return new Response("userData is required", { status: 400 });
        }
        const existingDoc = await User.findOne({ id: userId });
        if (!existingDoc) {
            try {

                const newUserData = new User({
                    id: userId,
                    name: userData.name,
                    username: username,
                    hireable: userData.hireable,
                    Image: userData.avatar_url,
                    bio: userData.bio,
                    location: userData.location,
                    followers: userData.followers,
                    following: userData.following,
                    public_repos: userData.public_repos,
                    blog: userData.blog,
                    twitter_username: userData.twitter_username,
                    github: userData.html_url,
                    email: userData.email || ""
                });

                await newUserData.save();


                return new Response("saved")
            } catch (error) {
                console.error("databse error:", error);
                return new Response("Internal server error", { status: 500 });
            }
        }else {
            return new Response("you already have a Profile", {status: 200})
        }

    } catch (error) {
        console.error("Internal error:", error);
        return new Response("Internal server error", { status: 500 });
    }
}