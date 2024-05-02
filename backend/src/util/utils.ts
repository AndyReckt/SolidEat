import {
    RestaurantModel,
    User,
    UserModel,
    UserZSchema,
} from "../schemas/models";
import { Document } from "mongoose";
import { Restaurant, RestaurantZSchema } from "../schemas/schemas";

export function userToMongoUser(zObj: User) {
    return new UserModel(JSON.stringify(zObj));
}

export function restaurantToMongoRestaurant(zObj: Restaurant) {
    return new RestaurantModel(JSON.stringify(zObj));
}

export function mongoRestaurantToRestaurant(
    mongoObj: Document | null
): Restaurant {
    if (!mongoObj) {
        throw new Error("Restaurant not found");
    }
    return RestaurantZSchema.parse(JSON.parse(JSON.stringify(mongoObj)));
}

export function mongoUserToUser(mongoObj: Document | null): User {
    if (!mongoObj) {
        throw new Error("User not found");
    }
    return UserZSchema.parse(JSON.parse(JSON.stringify(mongoObj)));
}
