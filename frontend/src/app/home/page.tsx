/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
const Cookies = require("js-cookie");
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { MinimizedUser, Restaurant, RestaurantType } from "@/_utils/_schemas";
import { gravatar } from "@/_utils/_gravatar";
import Image from "next/image";
import { restaurants } from "./home.server";
import { toast } from "react-toastify";
import RestaurantCard from "@/components/restaurantcard";

const Home: React.FC = () => {
    const token = Cookies.get("token");
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [allrestaurants, setAllrestaurants] = useState([] as Restaurant[]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([] as Restaurant[]);

    useEffect(() => {
        if (!token) {
            router.push("/");
            return;
        }
        const user = JSON.parse(Cookies.get("user")) as MinimizedUser;

        setAvatar(gravatar(user.email));
        setName(user.name);

        restaurants()
            .then((res) => {
                setAllrestaurants(res);
                setFilteredRestaurants(res); // Initialize filtered restaurants with all restaurants
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, [token, router]);

    useEffect(() => {
        // Filter restaurants based on search term
        const filtered = allrestaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRestaurants(filtered);
    }, [searchTerm, allrestaurants]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow flex flex-col justify-center items-center text-black bg-white tracking-widest">
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
                        value={searchTerm}
                        onChange={handleSearchChange}
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
                    Liste des restaurants
                </p>

                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard {...restaurant} key={restaurant.name} />
                ))}
            </div>
        </div>
    );
};

export default Home;
