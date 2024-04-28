import z from 'zod';

export const LocationSchema = z.object({
    lon: z.number(),
    lat: z.number(),
});

export type Location = z.infer<typeof LocationSchema>;

enum RestaurantType {
    Emerald = 'E',
    Solidarity = 'S',
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