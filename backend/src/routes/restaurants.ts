import { Express, Request, Response } from 'express';
import { Restaurant, RestaurantSchema } from '../schemas/schemas';
import * as fs from 'fs';

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json()

//this is all the restaurants
const restaurants: Array<Restaurant> = RestaurantSchema.array().parse(JSON.parse(fs.readFileSync('data/restaurants.json', 'utf-8')));

//this configuress the app for the /restaurants endpoint
export function configure(app: Express) {
    app.get('/restaurants/all', (_, res: Response) => {
        res.json(restaurants);
    });
}