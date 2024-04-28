export const register = async (
    formData: any
): Promise<{
    success: boolean;
    message: string;
}> => {
    return await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/auth/register",
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(formData),
            cache: "no-cache",
        }
    )
        .then((res) => {
            if (res.ok) {
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
