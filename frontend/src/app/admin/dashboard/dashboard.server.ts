import { User } from "@/_utils/_schemas";

export const users = async (): Promise<{ success: boolean; data: User[] | undefined; error: string | undefined; }> => {
    return await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/users/all",
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
