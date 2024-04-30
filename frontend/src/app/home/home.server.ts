import { Restaurant } from "@/_utils/_schemas";

export const restaurants = async (): Promise<Restaurant[]> => {
    return await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/restaurants/all",
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
            cache: "no-cache",
        }
    )
        .then((res) => {
            if (res.ok || res.status == 401 || res.status == 500) {
                return res.json();
            } else
                throw new Error(
                    `Request to get data returned code ${res.status}, `
                );
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};
