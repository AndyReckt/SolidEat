"use client";
const Cookies = require("js-cookie");
import {
    ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Restaurant } from "@/_utils/_schemas";

export default function RestaurantDirectionPage() {
    let restaurant = Cookies.get("restaurant");
    restaurant = JSON.parse(restaurant) as Restaurant;

    const router = useRouter();

    const handleGoBack = () => {
        router.push("/detail");
    };

    return (
        <div className="bg-gray-100 min-h-screen relative">
            <div className=" relative z-10">
                <button
                    onClick={handleGoBack}
                    className="absolute top-0 left-0 mt-4 ml-4 text-black px-4 py-2 rounded-full">
                    <ArrowUturnLeftIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="items-center justify-center flex-grow flex flex-col">
                <label className="input input-bordered flex items-center gap-2 w-full max-w-sm mb-10 mt-10">
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
                <div className="card card-side bg-white shadow-xl text-black">
                    <figure>
                        <Image src="" alt="img" className="max-w-full" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{restaurant.name}</h2>{" "}
                        {/* Récupérer le nom du restaurant */}
                        <p>{restaurant.address}</p>{" "}
                        {/* Récupérer l'adresse du restaurant */}
                        <p>Horaires d'ouverture</p>{" "}
                        {/* Récupérer les horaires d'ouverture */}
                        <p>Nombre de place réservé sur x</p>{" "}
                        {/* Récupérer le nombre de place réservé */}
                    </div>
                </div>
            </div>
        </div>
    );
}
