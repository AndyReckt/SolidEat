export const login = async (
    formData: any
): Promise<{
    success: boolean;
    message: string;
    token: string | undefined;
}> => {
    return await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + "/auth/login", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
        cache: "no-cache",
    })
        .then((res) => {
            if (res.ok || res.status == 401 || res.status == 500) {
                return res.json();
            } else
                throw new Error(
                    `Request to get data returned code ${res.status}`
                );
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};
