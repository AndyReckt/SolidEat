"use client";
/* eslint-disable react/no-unescaped-entities */
const Cookies = require("js-cookie");
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import { Restaurant } from "@/_utils/_schemas";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
declare var google: any;

const containerStyle = {
    width: "400px",
    height: "400px",
    marginBottom: "20px",
};

export default function RestaurantDetailPage() {
    let [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const [mapOptions, setMapOptions] = useState<{
        center: {
            lat: number;
            lng: number;
        };
        zoom: number;
    }>({
        center: {
            lat: 48.8575,
            lng: 2.3514,
        },
        zoom: 4,
    });
    useEffect(() => {
        if (location == null && navigator.geolocation) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
                setRestaurant(JSON.parse(Cookies.get("restaurant")));

                // setMapOptions({
                //     center: {
                //         lat: latitude,
                //         lng: longitude,
                //     },
                //     zoom: 12,
                // });
            });
            setLoaded(true);
        }
    }, [location]);

    let map: google.maps.Map;
    let googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

    const loader = new Loader({
        apiKey: googleMapsApiKey,
        version: "weekly",
        libraries: ["places", "maps", "marker"],
    });

    if (!loaded || restaurant == null) {
        return <div>Chargement...</div>;
    }

    loader
        .importLibrary("maps")
        .then(({ Map }) => {
            map = new Map(document.getElementById("map")!, mapOptions);

            const directionService = new google.maps.DirectionsService();
            const directionRenderer = new google.maps.DirectionsRenderer();
            directionRenderer.setMap(map);

            const request = {
                origin: { lat: location!.latitude, lng: location!.longitude }, // {lat, lng}
                destination: {
                    lat: restaurant!.location.lat,
                    lng: restaurant!.location.lon,
                }, // {lat, lng}
                travelMode: "DRIVING",
            };

            directionService.route(request, (result: any, status: any) => {
                if (status == "OK") {
                    directionRenderer.setDirections(result);
                }
            });
        })
        .catch((err) => {
            console.error(err);
        });

    return (
        <div className="bg-gray-100 min-h-screen relative">
            <div className=" relative z-10">
                <Link href="/detail">
                    <button className="absolute top-0 left-0 mt-4 ml-4 text-black px-4 py-2 rounded-full">
                        <ArrowUturnLeftIcon className="h-6 w-6" />
                    </button>
                </Link>
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
                <div id="map" style={containerStyle}></div>
                <div className="card card-side bg-white shadow-xl text-black">
                    <figure>
                        <Image src="" alt="" className="max-w-full" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{restaurant!.name}</h2>{" "}
                        {/* Récupérer le nom du restaurant */}
                        <p>{restaurant!.address}</p>{" "}
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
