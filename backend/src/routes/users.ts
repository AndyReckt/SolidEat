import z from "zod";
import { Express, Request, Response } from "express";

import bodyParser from "body-parser";
import { UserModel, UserRole } from "../schemas/models";
import { mongoUserToUser } from "../util/utils";
const jsonParser = bodyParser.json();

export function configure(app: Express) {
    app.get("/users/all", async (_, res: Response) => {
        let users = await UserModel.find({}).exec();
        let realUsers = users.map((user) => {
            return mongoUserToUser(user);
        });

        res.json({
            success: true,
            data: realUsers,
        });
    });
}
