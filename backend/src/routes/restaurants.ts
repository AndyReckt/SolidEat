import { Express, Request, Response } from "express";
import { Restaurant, RestaurantSchema } from "../schemas/schemas";
import * as fs from "fs";

import bodyParser from "body-parser";
import { maps } from "..";
import { Language } from "@googlemaps/google-maps-services-js";
const jsonParser = bodyParser.json();

//this is all the restaurants
const restaurants: Array<Restaurant> = RestaurantSchema.array().parse(
    JSON.parse(fs.readFileSync("data/restaurants.json", "utf-8"))
);

//this configuress the app for the /restaurants endpoint
export function configure(app: Express) {
    app.get("/restaurants/all", (_, res: Response) => {
        res.json(restaurants);
    });

    app.get(
        "/restaurants/directions/:name/:currentloc",
        (req: Request, res: Response) => {
            const [lat, lon] = req.params.currentloc.split(","); // [lat, lon]
            const name = req.params.name;
            const restaurant = restaurants.find((r) => r.name == name);

            if (!restaurant) {
                res.status(404).json({
                    success: false,
                    error: "Restaurant not found",
                });
                return;
            }

            maps.directions({
                params: {
                    origin: lat + "," + lon,
                    destination:
                        restaurant.location.lat + "," + restaurant.location.lon,
                    key: process.env.GOOGLE_MAPS_API_KEY!,
                    language: Language.fr,
                },
            })
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    res.json({
                        success: true,
                        data: response.data,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        success: false,
                        error: err,
                    });
                });
        }
    );
}
