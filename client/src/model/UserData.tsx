import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    hireable: { type: Boolean, required: true },
    Image: { type: String, required: true },
    bio: { type: String},
    location: { type: String, required: true },
    followers: { type: Number, required: true },
    following: { type: Number, required: true },
    public_repos: { type: Number, required: true },
    blog: { type: String},
    twitter_username: { type: String },
    github: { type: String, required: true },
    email: { type: String},
});


export const User = models.User || model("User", UserSchema);