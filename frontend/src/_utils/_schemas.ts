import { z } from "zod";

export enum UserRole {
    Admin = "admin",
    Restaurant = "restaurant",
    User = "user",
}

export interface Map<T> {
    [key: string]: T;
}

export let userToRestaurant: Map<Restaurant> = {};

export const LocationSchema = z.object({
    lon: z.number(),
    lat: z.number(),
});
export const ReviewSchema = z.object({
    username: z.string(),
    review: z.string(),
});

export type Review = z.infer<typeof ReviewSchema>;
export type Location = z.infer<typeof LocationSchema>;

export enum RestaurantType {
    Emerald = "E",
    Solidarity = "S",
}
export const ReservationSchema = z.object({
    restaurant: z.string(),
    username: z.string(),
    date: z.string(),
    time: z.string(),
    people: z.number(),
});
export const RestrictionSchema = z.object({
    comment: z.boolean(),
    review: z.boolean(),
});
export const RestaurantSchema = z.object({
    code: z.string(),
    name: z.string(),
    address: z.string(),
    city: z.string(),
    location: LocationSchema,
    type: z.nativeEnum(RestaurantType),
    reviews: z.array(ReviewSchema),
    seats: z.number(),
});
export type Reservation = z.infer<typeof ReservationSchema>;

export type Restriction = z.infer<typeof RestrictionSchema>;
export const UserZSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
    role: z.nativeEnum(UserRole),
    restriction: RestrictionSchema,
});

export type Restaurant = z.infer<typeof RestaurantSchema>;
export type User = z.infer<typeof UserZSchema>;
export const MinimizedUserSchema = z.object({
    name: z.string(),
    username: z.string(),
    role: z.nativeEnum(UserRole),
    email: z.string().email(),
    restriction: RestrictionSchema,
});
export type MinimizedUser = z.infer<typeof MinimizedUserSchema>;
