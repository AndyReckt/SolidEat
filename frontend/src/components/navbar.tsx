/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MinimizedUser, UserRole } from "@/_utils/_schemas";
const Cookies = require("js-cookie");
import { PowerIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
    const router = useRouter();
    const [user, setUser] = useState<MinimizedUser | null>(null);

    useEffect(() => {
        const token = Cookies.get("token");
        const storedUser = Cookies.get("user");
        if (!token || !storedUser) {
            router.push("/");
            return;
        }
        const parsedUser = JSON.parse(storedUser) as MinimizedUser;
        setUser(parsedUser);
    }, [router]);

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("user");
        router.push("/");
    };

    const handleAdminClick = () => {

        router.push("/admin/dashboard");
    };

    return (
        <div className="navbar bg-white justify-end px-2">
            {user && user.role === UserRole.Admin && (
                <div
                    tabIndex={0}
                    role="button"
                    onClick={handleAdminClick}
                    className="btn btn-ghost mr-5 bg-gray-500 hover:bg-gray-700 rounded-btn flex items-center gap-1">
                    <span>Admin</span>
                </div>
            )}

            <div
                tabIndex={0}
                role="button"
                onClick={logout}
                className="btn btn-ghost bg-red-500 hover:bg-red-700 rounded-btn flex items-center gap-1">
                <PowerIcon className="h-6 w-6" />
                <span>Déconnexion</span>
            </div>
        </div>
    );
};

export default Navbar;
