"use client";

import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
const Cookies = require("js-cookie");
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

const Home: React.FC = () => {
    const token = Cookies.get("token");
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, [token, router]);

    const logout = () => {
        Cookies.remove("token");
        router.push("/");
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow flex flex-col justify-center items-center text-black bg-white tracking-widest uppercase p-8">
                <label className="input input-bordered flex items-center gap-2 w-full max-w-sm mb-4">
                    <input type="text" className="w-full" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>

                <p className="text-4xl font-extrabold my-4">Recommandé</p>


                <div className="flex flex-col items-center space-y-4">
                    <div className="card card-side bg-white shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" className="max-w-full " /></figure>
                        <div className="card-body">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Watch</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-side bg-white shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Watch</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-side bg-white shadow-xl">
                        <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Watch</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={logout}
                className="bg-white border-2 border-white hover:bg-transparent transition-all text-indigo-700 hover:text-white font-semibold text-lg px-4 py-2 rounded duration-700 mt-4">
                Logout
            </button>
        </div>
    );
}

export default Home;
