import z from "zod";
import mongoose, { Schema } from "mongoose";

export enum UserRole {
    Admin = "admin",
    Restaurant = "restaurant",
    User = "user",
}

export const RestrictionSchema = z.object({
    comment: z.boolean(),
    review: z.boolean(),
});

export const UserZSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
    role: z.nativeEnum(UserRole),
    restriction: RestrictionSchema,
});

export const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    restriction: {
        comment: { type: Boolean, required: true },
        review: { type: Boolean, required: true },
    },
});

export const RestaurantSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    location: {
        lon: { type: Number, required: true },
        lat: { type: Number, required: true },
    },
    type: { type: String, required: true },
    reviews: [
        {
            username: { type: String, required: true },
            review: { type: String, required: true },
        },
    ],
    seats: { type: Number, required: true },
});

export const ReservationZSchema = z.object({
    restaurant: z.string(),
    username: z.string(),
    date: z.string(),
    time: z.string(),
    people: z.number(),
});

export const ReservationSchema = new Schema({
    restaurant: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    people: { type: Number, required: true },
});

export type Reservation = z.infer<typeof ReservationZSchema>;
export type User = z.infer<typeof UserZSchema>;
export type Restriction = z.infer<typeof RestrictionSchema>;

export const UserModel = mongoose.model("User", UserSchema);
export const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
export const ReservationModel = mongoose.model(
    "Reservation",
    ReservationSchema
);
