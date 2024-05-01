import { z } from "zod";

export enum UserRole {
    Admin = "admin",
    Restaurant = "restaurant",
    User = "user",
}

export const MinimizedUserSchema = z.object({
    name: z.string(),
    username: z.string(),
    role: z.nativeEnum(UserRole),
    email: z.string().email(),
});

export interface Map<T> {
    [key: string]: T;
}

export let userToRestaurant: Map<Restaurant> = {};

export type MinimizedUser = z.infer<typeof MinimizedUserSchema>;

export const LocationSchema = z.object({
    lon: z.number(),
    lat: z.number(),
});

export type Location = z.infer<typeof LocationSchema>;

export enum RestaurantType {
    Emerald = "E",
    Solidarity = "S",
}

export const RestaurantSchema = z.object({
    code: z.string(),
    name: z.string(),
    address: z.string(),
    city: z.string(),
    location: LocationSchema,
    type: z.nativeEnum(RestaurantType),
});

export type Restaurant = z.infer<typeof RestaurantSchema>;
