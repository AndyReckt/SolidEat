"use client";
import React, { useState, useEffect } from "react";
const Cookies = require("js-cookie");
import {
    MapPinIcon,
    HeartIcon,
    ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { MinimizedUser, Restaurant, userToRestaurant } from "@/_utils/_schemas";
import { distance } from "./detail.server";
import { toast } from "react-toastify";
import {
    getUserDirections,
    setUserDirections,
} from "@/_utils/_directionshelper";
import ReservationModal from "@/components/reservationmodal";


export default function RestaurantDetailPage() {
    let restaurant = Cookies.get("restaurant");
    restaurant = JSON.parse(restaurant) as Restaurant;
    const [restaurantImage, setRestaurantImage] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    useEffect(() => {
        fetchRandomImage();
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        }
    }, []);

    const fetchRandomImage = async () => {
        try {
            const response = await fetch(
                "https://source.unsplash.com/random/800x600"
            );
            if (response.ok) {
                const imageUrl = response.url;
                setRestaurantImage(imageUrl);
            } else {
                console.error("Failed to fetch random image");
            }
        } catch (error) {
            console.error("Error fetching random image:", error);
        }
    };
    const router = useRouter();

    const handleGoBack = () => {
        delete userToRestaurant[
            (JSON.parse(Cookies.get("user")) as MinimizedUser).username
        ];
        Cookies.remove("restaurant");
        router.push("/home");
    };

    const handleDirectionClick = () => {
        const user = JSON.parse(Cookies.get("user")) as MinimizedUser;
        toast.info("Direction en cours de calcul");
        setTimeout(() => {
            if (Cookies.get("steps")) {
                throw new Error(getUserDirections(user.username));
                toast.success(Cookies.get("steps"));
            }
        }, 1000);
        if (location) {
            distance(restaurant, location)
                .then((res) => {
                    if (res.success) {
                        // const steps = res.data.routes[0].legs[0].steps.map(
                        //     (step: any) => step.html_instructions
                        // );

                        const steps = res.data.routes[0];

                        Cookies.set("steps", user.username);
                        setUserDirections(user.username, JSON.stringify(steps));

                        router.push("/direction");
                    } else {
                        console.error(res.error);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-100 min-h-screen relative">
            <div className="container mx-auto relative">
                <div className="mb-8 relative z-10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={restaurantImage}
                        alt="Restaurant"
                        className="w-full h-64 object-cover shadow-md"
                    />
                    <button
                        onClick={handleGoBack}
                        className="absolute top-0 left-0 mt-4 ml-4 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-full">
                        <ArrowUturnLeftIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-8 relative z-10 mt-[-4rem] rounded-tl-2xl rounded-tr-2xl">
                    <h1 className="text-black text-3xl font-bold mb-4 text-center">
                        {restaurant.name}
                    </h1>
                    <div className="flex justify-center items-center mb-4">
                        <MapPinIcon className="w-6 h-6 text-gray-600 mr-2" />
                        <p className="text-gray-600 mr-2 text-sm">
                            {" "}
                            {restaurant.address +
                                " " +
                                restaurant.code +
                                " " +
                                restaurant.city}
                        </p>
                        <div className="h-6 bg-gray-300 w-px mx-2"></div>
                        <p className="text-gray-600 ml-2 text-sm">
                            Nombre Reservé
                        </p>
                        <button onClick={handleLikeClick} className="ml-4">
                            <HeartIcon
                                className={`w-6 h-6 ${isLiked ? "text-red-500" : "text-gray-600"
                                    }`}
                            />
                        </button>
                    </div>

                    {/*Bouton Direction envoyer vers la page Direction ? */}
                    <div className="text-center">
                        <button
                            onClick={handleDirectionClick}
                            className="btn btn-secondary bg-gray-500 hover:bg-gray-700 text-white mb-2 w-96">
                            Direction
                        </button>
                    </div>

                    {/*Bouton Réserver qui ouvre un pop-up pour réserver */}
                    <div className="text-center">
                        <button
                            onClick={handleOpenModal}
                            className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white w-96">
                            Réserver
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && <ReservationModal onClose={handleCloseModal} />}
            <div>
                <textarea
                    placeholder="Add your comment..."
                    className="w-96 h-24 border border-gray-300 rounded-md p-2 mt-4 mx-auto block resize-none focus:outline-none focus:ring-2 bg-gray-100 focus:ring-blue-500"
                ></textarea>
                <button
                    className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white w-96 text-center mt-2 mx-auto block"
                >
                    Add Comment
                </button>
            </div>
        </div>

    );
}
