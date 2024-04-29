"use client";

import { login } from "./login.server";
import Head from "next/head";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cookies = require("js-cookie");
import { useRouter } from "next/navigation";
import Link from "next/link";

import Image from "next/image";
import { hash } from "@/_utils/_hashutils";

export default function Home() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await login(formData);
        if (res.success) {
            toast.success(res.message);
            Cookies.set("token", res.token);
            setTimeout(() => {
                router.push("/home");
            }, 1000);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <>
            <Head>
                <title>Login System</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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

                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-950 md:text-2xl ">
                                Log into your account
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className=" space-y-4 md:space-y-6"
                                action="#">
                                <div className="text-left">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-950">
                                        Username or email
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="bg-red-50 border border-red-300 text-gray-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="name@company.com"
                                        required={true}
                                    />
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-950 ">
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
                                        className="bg-red-50 border border-red-300 text-gray-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        required={true}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-red-300 rounded bg-red-50 focus:ring-3 focus:ring-primary-300 "
                                                required={false}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-950 ">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-gray-950 hover:underline ">
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-950 ">
                                    Don’t have an account yet?{" "}
                                    <Link
                                        href="/register"
                                        className="font-medium text-gray-950 hover:underline ">
                                        Sign up
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
