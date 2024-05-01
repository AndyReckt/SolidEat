import { Restaurant } from "@/_utils/_schemas";

export const distance = async (
    restaurant: Restaurant,
    location: { latitude: number; longitude: number }
): Promise<{
    success: boolean;
    error: string | undefined;
    data: any | undefined;
}> => {
    return await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! +
            `/restaurants/directions/${restaurant.name}/${location.latitude},${location.longitude}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
            cache: "no-cache",
        }
    ).then((res) => {
        if (res.ok || res.status == 401 || res.status == 500) {
            return res.json();
        } else
            throw new Error(
                `Request to get data returned code ${res.status}, `
            );
    });
};
