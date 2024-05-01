"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MinimizedUser, User, UserRole } from "@/_utils/_schemas";
const Cookies = require("js-cookie");
import "react-toastify/dist/ReactToastify.css";
import FetchUser from "@/components/fetchuser";
import { users as fetchUsers } from "./dashboard.server";

const AdminDashboard = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const user = JSON.parse(Cookies.get("user")) as MinimizedUser;
        const fetchAndSetUsers = async () => {
            if (user.role !== UserRole.Admin) {
                router.push("/home");
            } else {
                const res = await fetchUsers();
                if (res.success) {
                    setUsers(res.data as User[]);
                }
            }
        };

        fetchAndSetUsers();
    }, [router]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <h2 className="text-xl font-bold mb-2">User List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user: User) => (
                    <FetchUser key={user.username} {...user} />
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
