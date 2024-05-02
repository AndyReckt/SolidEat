import mongoose, { model } from "mongoose";
import { RestaurantModel } from "../schemas/models";
import { createRestaurant, Restaurant } from "../schemas/schemas";
import fs from "fs";

export async function init(uri: string) {
    await mongoose.connect(uri, {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
        zlibCompressionLevel: 6,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 30000,
    });

    const count = await RestaurantModel.countDocuments().exec();

    if (count == 0) {
        const restaurants: Array<Restaurant> = [];
        JSON.parse(fs.readFileSync("data/restaurants.json", "utf-8")).forEach(
            (element: any) => {
                restaurants.push(createRestaurant(element));
            }
        );

        await RestaurantModel.insertMany(restaurants);
        console.log("Inserted restaurants into database");
    }

    mongoose.connection.on(
        "error",
        console.error.bind(console, "mongo error:")
    );
}
