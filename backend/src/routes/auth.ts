import z from "zod";
import { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";

import bodyParser from "body-parser";
import { UserModel } from "../schemas/models";
import { mongoUserToUser } from "../util/utils";
const jsonParser = bodyParser.json();

const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(8),
});

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(8),
});

export function configure(app: Express) {
    app.post("/auth/login", jsonParser, async (req: Request, res: Response) => {
        const { email, password } = req.body;
        let it = loginSchema.safeParse({ email, password });

        if (!it.success) {
            return res.status(401).json({
                success: false,
                message: it.error.errors[0].message,
            });
        }

        let data = it.data;

        try {
            let usermodel = await UserModel.findOne({
                $or: [{ username: data.email }, { email: data.email }],
            }).exec();
            if (!usermodel) {
                return res.status(401).json({
                    success: false,
                    message: "Account not found, please sign up",
                });
            }

            let user = mongoUserToUser(usermodel);

            let pswd = user.password == data.password;
            if (!pswd) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect password",
                });
            }

            let secret: string = process.env.JWT_SECRET as string;

            let token = jwt.sign(
                { email: user.email, id: usermodel._id, name: user.name },
                secret,
                { expiresIn: "6h" }
            );

            return res.status(200).json({
                success: true,
                message: "Login successful",
                token: token,
            });
        } catch (error) {
            console.log("Error in login_user (server) => ", error);

            res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    });

    app.post(
        "/auth/register",
        jsonParser,
        async (req: Request, res: Response) => {
            const { name, email, username, password } = req.body;
            let it = registerSchema.safeParse({
                name,
                email,
                username,
                password,
            });

            if (!it.success) {
                return res.status(401).json({
                    success: false,
                    message: it.error.errors[0].message,
                });
            }

            let data = it.data;

            try {
                let usermodel = await UserModel.findOne({
                    email: data.email,
                }).exec();
                if (usermodel) {
                    return res.status(401).json({
                        success: false,
                        message: "Email already exists, please login",
                    });
                }

                let usernamemodel = await UserModel.findOne({
                    username: data.username,
                }).exec();
                if (usernamemodel) {
                    return res.status(401).json({
                        success: false,
                        message: "Username already exists, please login",
                    });
                }

                let user = new UserModel({
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    role: "user", //todo: to change using a dropdown menu in the frontend
                });

                await user.save();

                return res.status(200).json({
                    success: true,
                    message: "Account created successfully",
                });
            } catch (error) {
                console.log("Error in register_user (server) => ", error);

                res.status(500).json({
                    success: false,
                    message: "Something went wrong",
                });
            }
        }
    );
}
