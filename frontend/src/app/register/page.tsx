"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "./register.server";
import { hash } from "@/_utils/_hashutils";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await register(formData);

        if (res.success) {
            toast.success(res.message);
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <>
            <section className="bg-gray-50 text-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="relative mb-4 bg-white p-1 rounded-full">
                        <div className="rounded-full overflow-hidden border-4 border-white w-24 h-24 flex items-center justify-center">
                            <Image
                                src={"/logo.svg"}
                                width={64}
                                height={64}
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-950 md:text-2xl ">
                                Créer un compte
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className=" space-y-4 md:space-y-6"
                                action="#">
                                <div className="text-left">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-950">
                                        Nom
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-red-50 border border-red-300 text-gray-950 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 "
                                        placeholder="Charlie"
                                        required={true}
                                    />
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-950 ">
                                        Nom d'utilisateur
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                username: e.target.value,
                                            })
                                        }
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-red-50 border border-red-300 text-gray-950 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 "
                                        placeholder="moistcr1tikal"
                                        required={true}
                                    />
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-950 ">
                                        Votre email
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-red-50 border border-red-300 text-gray-950 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 "
                                        placeholder="name@company.com"
                                        required={true}
                                    />
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-950 ">
                                        Mot de passe
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: hash(e.target.value),
                                            })
                                        }
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-red-50 border border-red-300 text-gray-950 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 "
                                        required={true}
                                    />
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="usertype"
                                        className="block mb-2 text-sm font-medium text-gray-950 ">
                                        Vous êtes ?
                                    </label>
                                    <select className="select select-bordered w-full bg-red-50 border border-red-300 text-gray-950 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5">
                                        <option disabled selected>Choisissez</option>
                                        <option>Un Utilisateur</option>
                                        <option>Un Restaurateur</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    S'inscrire
                                </button>
                                <p className="text-sm font-light text-gray-950 ">
                                    Vous avez déja un compte ? {" "}
                                    <Link
                                        href="/"
                                        className="font-medium text-gray-950 hover:underline ">
                                        Connectez-vous
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}
