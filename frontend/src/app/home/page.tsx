"use client";
import React, { useEffect } from "react";
const Cookies = require("js-cookie");
import { useRouter } from "next/navigation";

export default function Home() {
    const token = Cookies.get("token");
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    });

    const logout = () => {
        Cookies.remove("token");
        router.push("/");
    };

    return (
        <div className="w-full h-screen flex items-center justify-center text-white bg-indigo-700 flex-col tracking-widest uppercase">
            <p className="text-4xl font-extrabold mb-4">Welcome to home Page</p>
            <button
                onClick={logout}
                className="bg-white border-2 border-white hover:bg-transparent transition-all text-indigo-700 hover:text-white font-semibold text-lg  px-4 py-2 rounded duration-700 ">
                Logout
            </button>
        </div>
    );
}
