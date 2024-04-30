/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
const Cookies = require("js-cookie");
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { MinimizedUser } from "@/_utils/_schemas";
import { gravatar } from "@/_utils/_gravatar";
import Image from "next/image";

const Home: React.FC = () => {
    const token = Cookies.get("token");
    const user = JSON.parse(Cookies.get("user")) as MinimizedUser;
    const router = useRouter();
    let [avatar, setAvatar] = useState("");
    let [name, setName] = useState("");

    useEffect(() => {
        if (!token || !user) {
            router.push("/");
            return;
        }
        setAvatar(gravatar(user.email));
        setName(user.name);
    }, [token, user, router]);

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("user");
        router.push("/");
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow flex flex-col justify-center items-center text-black bg-white tracking-widest">
                {/* Salut username requis + image photo de profil ? */}
                <div className="card card-side bg-white">
                    <figure>
                        <Image
                            src={avatar}
                            alt="Image"
                            className="max-w-full"
                            width={64}
                            height={64}
                        />
                    </figure>
                    <div className="card-body">
                        <p>Salut</p>
                        <p className="card-title">{name}</p>{" "}
                        {/* Récupérer le nom de l'utilisateur */}
                    </div>
                </div>
                <div className="">
                    <p className="font-bold">
                        Retrouvez les restaurants solidaires
                    </p>
                </div>

                <label className="input input-bordered flex items-center gap-2 w-full max-w-sm mb-4 bg-white">
                    <input
                        type="text"
                        className="w-full"
                        placeholder="Search"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>

                <p className="text-2xl font-extrabold my-4 ">
                    Listes des restaurants
                </p>

                {/* Récupération des données du restaurant et les mettres dedans*/}
                <div className="flex flex-col items-center space-y-4">
                    <div className="card card-side bg-white shadow-xl">
                        <figure>
                            <Image src="" alt="Image" className="max-w-full" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Nom Restaurant</h2>{" "}
                            {/* Récupérer le nom du restaurant */}
                            <p>Adresse du restaurant</p>{" "}
                            {/* Récupérer l'adresse du restaurant */}
                            <p>Horaires d'ouverture</p>{" "}
                            {/* Récupérer les horaires d'ouverture */}
                            <p>Nombre de place réservé sur x</p>{" "}
                            {/* Récupérer le nombre de place réservé */}
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Réservez
                                </button>{" "}
                                {/* Récupérer le bouton de réservation (a voir) */}
                            </div>
                        </div>
                    </div>

                    <div className="card card-side bg-white shadow-xl">
                        <figure>
                            <Image src="" alt="Image" className="max-w-full" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Nom Restaurant</h2>
                            <p>Adresse du restaurant</p>
                            <p>Horaires d'ouverture</p>
                            <p>Nombre de place réservé sur x</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Réservez
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-side bg-white shadow-xl">
                        <figure>
                            <Image src="" alt="Image" className="max-w-full" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Nom Restaurant</h2>
                            <p>Adresse du restaurant</p>
                            <p>Horaires d'ouverture</p>
                            <p>Nombre de place réservé sur x</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Réservez
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
