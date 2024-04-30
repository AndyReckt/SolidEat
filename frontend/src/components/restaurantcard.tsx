"use client";
/* eslint-disable react/no-unescaped-entities */
import { Restaurant } from "@/_utils/_schemas";
import Image from "next/image";
const Cookies = require("js-cookie");
import { useRouter } from "next/navigation";
import { set } from "zod";

export default function RestaurantCard(restaurant: Restaurant) {
    const router = useRouter();
    const reserved = () => {
        Cookies.set("restaurant", JSON.stringify(restaurant));
        router.push("/detail");
    };

    return (
        <div className="card card-side bg-white shadow-xl">
            <figure>
                <Image src="" alt="Image" className="max-w-full" />
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
                <div className="card-actions justify-end">
                    <button onClick={reserved} className="btn btn-primary">
                        Réservez
                    </button>{" "}
                    {/* Récupérer le bouton de réservation (a voir) */}
                </div>
            </div>
        </div>
    );
}
