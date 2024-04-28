import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import * as fs from 'fs';

dotenv.config();

const portEnv = process.env.PORT;


if (!portEnv) {
    console.error("setup .env");
    process.exit(-1);
}
const port = parseInt(portEnv);

if (isNaN(port)) {
    console.error("port is not a number");
    process.exit(-1);
}


const app: Express = express();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()