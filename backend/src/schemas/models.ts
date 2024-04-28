import z from "zod";
import mongoose, { Schema } from "mongoose";

export const UserZSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
});

export const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
});

export type User = z.infer<typeof UserZSchema>;
export const UserModel = mongoose.model("User", UserSchema);
