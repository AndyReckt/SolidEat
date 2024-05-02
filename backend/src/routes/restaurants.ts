import { Express, Request, Response } from "express";

import bodyParser from "body-parser";
import {
    ReservationModel,
    ReservationSchema,
    ReservationZSchema,
    RestaurantModel,
} from "../schemas/models";
import { mongoRestaurantToRestaurant } from "../util/utils";
import { Restaurant } from "../schemas/schemas";
import z from "zod";
const jsonParser = bodyParser.json();

const editSchema = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    location: z.object({
        lon: z.number(),
        lat: z.number(),
    }),
    type: z.string(),
});

//this configuress the app for the /restaurants endpoint
export function configure(app: Express) {
    app.get("/restaurants/all", async (_, res: Response) => {
        let restaurants = await RestaurantModel.find({}).exec();
        res.json(restaurants);
    });

    app.post(
        "/restaurants/edit",
        jsonParser,
        async (req: Request, res: Response) => {
            const schema = editSchema.safeParse(req.body);

            if (!schema.success) {
                res.json({
                    success: false,
                    error: schema.error,
                });
                return;
            }

            const { name, address, city, location, type } = schema.data;

            let restaurant = await RestaurantModel.findOne({
                name: name,
            }).exec();
            if (!restaurant) {
                res.json({
                    success: false,
                    error: "Restaurant not found",
                });
                return;
            }
            restaurant.address = address;
            restaurant.city = city;
            restaurant.location = location;
            restaurant.type = type;
            await restaurant.save();
            res.json({
                success: true,
                data: mongoRestaurantToRestaurant(restaurant),
            });
        }
    );

    app.post(
        "/restaurants/review/add",
        jsonParser,
        async (req: Request, res: Response) => {
            const { name, review } = req.body;
            const restaurant = await RestaurantModel.findOne({
                name: name,
            }).exec();

            if (!restaurant) {
                res.status(404).json({
                    success: false,
                    error: "Restaurant not found",
                });
                return;
            }

            restaurant.reviews.push(review);
            restaurant.save();

            res.json({
                success: true,
                data: mongoRestaurantToRestaurant(restaurant),
            });
        }
    );

    app.post(
        "/restaurants/reservation/add",
        jsonParser,
        async (req: Request, res: Response) => {
            const schema = ReservationZSchema.safeParse(req.body);

            if (!schema.success) {
                res.json({
                    success: false,
                    error: schema.error,
                });
                return;
            }

            const reqReservation = schema.data;

            let restaurant = await RestaurantModel.findOne({
                name: reqReservation.restaurant,
            }).exec();

            if (!restaurant) {
                res.json({
                    success: false,
                    error: "Restaurant not found",
                });
                return;
            }

            let oldReservations = await ReservationModel.find({
                $and: [
                    { date: reqReservation.date },
                    { username: reqReservation.username },
                ],
            }).exec();

            if (oldReservations.length > 0) {
                res.json({
                    success: false,
                    error: "User already has a reservation for that date",
                });
                return;
            }

            let reservations = await ReservationModel.find({
                $and: [
                    { date: reqReservation.date },
                    { restaurant: reqReservation.restaurant },
                ],
            }).exec();
            let usedSeats = reservations
                .map((reservation) => reservation.people)
                .reduce((a, b) => a + b, 0);
            if (usedSeats + reqReservation.people > restaurant.seats) {
                res.json({
                    success: false,
                    error: "Not enough seats",
                });
                return;
            }

            let reservation = new ReservationModel({
                restaurant: reqReservation.restaurant,
                username: reqReservation.username,
                date: reqReservation.date,
                time: reqReservation.time,
                people: reqReservation.people,
            });

            await reservation.save();
            res.json({
                success: true,
                data: reservation,
            });
        }
    );
}
