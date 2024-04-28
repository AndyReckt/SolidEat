import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as restaurants from './routes/restaurants';

dotenv.config();

const portEnv = process.env.PORT;
const hostEnv = process.env.HOST;
const mongo_uri = process.env.MONGO_URI;


if (!portEnv || !hostEnv || !mongo_uri) {
    console.error("setup .env");
    process.exit(-1);
}
const port = parseInt(portEnv);

if (isNaN(port)) {
    console.error("port is not a number");
    process.exit(-1);
}

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.json({enabled: true});
});

restaurants.configure(app);

app.listen(port, hostEnv, () => {
    console.log(`⚡️[server]: Server is running at http://${hostEnv}:${port}`);
});