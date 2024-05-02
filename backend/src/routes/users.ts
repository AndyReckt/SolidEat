import z from "zod";
import { Express, Request, Response } from "express";

import bodyParser from "body-parser";
import { RestrictionSchema, UserModel, UserRole } from "../schemas/models";
import { mongoUserToUser } from "../util/utils";
const jsonParser = bodyParser.json();

const editschema = z.object({
    username: z.string(),
    role: z.string().optional(),
    restriction: RestrictionSchema.optional(),
});

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

    app.post("/users/edit", jsonParser, async (req: Request, res: Response) => {
        let { username, role, restriction } = editschema.parse(req.body);

        if (!role && !restriction) {
            res.json({
                success: false,
                error: "No role or restriction provided",
            });
            return;
        }

        let user = await UserModel.findOne({ username: username }).exec();
        if (!user) {
            res.json({
                success: false,
                error: "User not found",
            });
            return;
        }

        if (role) {
            user.role = role as UserRole;
        }
        if (restriction) {
            user.restriction = restriction;
        }
        await user.save();

        res.json({
            success: true,
            user: mongoUserToUser(user),
        });
    });
}
