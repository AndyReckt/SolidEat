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
            <section className="bg-indigo-700 text-center">
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
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-indigo-800 dark:border-indigo-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-700 md:text-2xl dark:text-white">
                                Create an Account
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className=" space-y-4 md:space-y-6"
                                action="#">
                                <div className="text-left">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-indigo-700 dark:text-white">
                                        Your Name
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
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Charlie"
                                        required={true}
                                    />
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-indigo-700 dark:text-white">
                                        Username
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
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="moistcr1tikal"
                                        required={true}
                                    />
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-indigo-700 dark:text-white">
                                        Your email
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
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required={true}
                                    />
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-indigo-700 dark:text-white">
                                        Password
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
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required={true}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Sign Up
                                </button>
                                <p className="text-sm font-light text-indigo-500 dark:text-indigo-400">
                                    Already have an account{" "}
                                    <Link
                                        href="/"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Sign In
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
