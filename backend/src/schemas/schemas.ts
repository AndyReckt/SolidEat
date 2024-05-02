import z from "zod";

export const LocationSchema = z.object({
    lon: z.number(),
    lat: z.number(),
});

export type Location = z.infer<typeof LocationSchema>;

export enum RestaurantType {
    Emerald = "E",
    Solidarity = "S",
}

export const ReviewSchema = z.object({
    username: z.string(),
    review: z.string(),
});

export type Review = z.infer<typeof ReviewSchema>;

export const RestaurantZSchema = z.object({
    code: z.string(),
    name: z.string(),
    address: z.string(),
    city: z.string(),
    location: LocationSchema,
    type: z.nativeEnum(RestaurantType),
    reviews: z.array(ReviewSchema),
    seats: z.number(),
});

export type Restaurant = z.infer<typeof RestaurantZSchema>;

export function createRestaurant(data: {
    code: string;
    name: string;
    address: string;
    city: string;
    location: Location;
    type: RestaurantType;
}): Restaurant {
    return RestaurantZSchema.parse({
        ...data,
        reviews: [],
        seats: 10,
    });
}
