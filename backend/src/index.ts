import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import * as mongo from "./database/mongo";
import * as restaurants from "./routes/restaurants";
import * as auth from "./routes/auth";

dotenv.config();
const portEnv = process.env.PORT;
const hostEnv = process.env.HOST;
const mongo_uri = process.env.MONGO_URI;

if (!portEnv || !hostEnv || !mongo_uri || !process.env.JWT_SECRET) {
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

const app: Express = express();
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
    res.json({ enabled: true });
});

restaurants.configure(app);
auth.configure(app);

app.listen(port, hostEnv, () => {
    console.log(`⚡️[server]: Server is running at http://${hostEnv}:${port}`);
});
