import { User, UserModel, UserZSchema } from "../schemas/models";
import { Document } from "mongoose";

export function userToMongoUser(zObj: User) {
    return new UserModel(JSON.stringify(zObj));
}

export function mongoUserToUser(mongoObj: Document | null): User {
    if (!mongoObj) {
        throw new Error("User not found");
    }
    return UserZSchema.parse(JSON.parse(JSON.stringify(mongoObj)));
}
