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

export type MinimizedUser = z.infer<typeof MinimizedUserSchema>;
