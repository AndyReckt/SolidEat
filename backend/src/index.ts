import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Client as GoogleMapsClient } from "@googlemaps/google-maps-services-js";

import * as mongo from "./database/mongo";
import * as restaurants from "./routes/restaurants";
import * as auth from "./routes/auth";
import * as users from "./routes/users";

dotenv.config();
const portEnv = process.env.PORT;
const hostEnv = process.env.HOST;
const mongo_uri = process.env.MONGO_URI;

if (
    !portEnv ||
    !hostEnv ||
    !mongo_uri ||
    !process.env.JWT_SECRET ||
    !process.env.GOOGLE_MAPS_API_KEY
) {
    console.error("setup .env");
    process.exit(-1);
}
const port = parseInt(portEnv);

if (isNaN(port)) {
    console.error("port is not a number");
    process.exit(-1);
}

mongo
    .init(mongo_uri)
    .then(() => {
        console.log("connected to mongo");
    })
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });

export const maps = new GoogleMapsClient({});

const app: Express = express();
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
    res.json({ enabled: true });
});

restaurants.configure(app);
auth.configure(app);
users.configure(app);

app.listen(port, hostEnv, () => {
    console.log(`⚡️[server]: Server is running at http://${hostEnv}:${port}`);
});
