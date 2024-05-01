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
    const user = JSON.parse(Cookies.get("user")) as MinimizedUser;

    useEffect(() => {
        const fetchAndSetUsers = async () => {
            if (user.role !== UserRole.Admin) {
                router.push('/home');
            } else {
                const res = await fetchUsers();
                if (res.success) {
                    setUsers(res.data as User[]);
                }
            }
        };

        fetchAndSetUsers();
    }, [router, user]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>User List</h2>
            {users.map((user: User) => (
                <FetchUser key={user.username} {...user} />
            ))}
        </div>
    );
};

export default AdminDashboard;
