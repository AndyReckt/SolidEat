"use client";

import { login } from "./login.server";
import Head from "next/head";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cookies = require("js-cookie");
import Router from "next/router";
import Link from "next/link";

import Image from "next/image";

export default function Home() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await login(formData);
        if (res.success) {
            toast.success(res.message);
            Cookies.set("token", res.token);
            setTimeout(() => {
                Router.push("/home");
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
            <section className="bg-indigo-700 text-center text-indigo-600">
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
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-600 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className=" space-y-4 md:space-y-6"
                                action="#">
                                <div className="text-left">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
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
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required={true}
                                    />
                                </div>
                                <div className="text-left">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                                className="w-4 h-4 border border-indigo-300 rounded bg-indigo-50 focus:ring-3 focus:ring-primary-300 dark:bg-indigo-700 dark:border-indigo-600 dark:focus:ring-primary-600 dark:ring-offset-indigo-800"
                                                required={false}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-indigo-500 dark:text-indigo-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-indigo-500 dark:text-indigo-400">
                                    Don’t have an account yet?{" "}
                                    <Link
                                        href="/register"
                                        className="font-medium text-indigo-600 hover:underline dark:text-primary-500">
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
