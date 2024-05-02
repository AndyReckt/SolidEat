"use client";
/* eslint-disable react/no-unescaped-entities */
import { User, UserRole } from "@/_utils/_schemas";
import { ToastContainer, toast } from "react-toastify";
const Cookies = require("js-cookie");

export default function fetchuser(fetchuser: User) {
    return (
        <>
            <div className="py-3">
                <div className="card card-side shadow-xl bg-slate-400 text-black">
                    <div className="card-body">
                        <h4 className="card-title">{fetchuser.username}</h4>
                        <p>nom : {fetchuser.name}</p>
                        <p>email : {fetchuser.email}</p>
                        <p>role : {fetchuser.role}</p>

                        <select name="" id="" className="bg-white" onChange={async (e) => {
                            let res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/users/edit",
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    method: "POST",
                                    body: JSON.stringify({
                                        username: fetchuser.username,
                                        role: e.target.value,
                                    }),
                                    cache: "no-cache",
                                }
                            )
                                .then((res) => {
                                    if (res.ok || res.status == 401 || res.status == 500) {
                                        return res.json();
                                    } else
                                        throw new Error(
                                            `Request to get data returned code ${res.status}, `
                                        );
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return err;
                                });

                            if (res.error) {
                                toast.error(res.error);
                                return;
                            } else {
                                toast.success("User role updated");
                            }
                        }}>
                            {fetchuser.role == UserRole.Admin && <option value={UserRole.Admin} selected>Admin</option>}
                            {fetchuser.role != UserRole.Admin && <option value={UserRole.Admin}>Admin</option>}

                            {fetchuser.role == UserRole.Restaurant && <option value={UserRole.Restaurant} selected>Restaurant</option>}
                            {fetchuser.role != UserRole.Restaurant && <option value={UserRole.Restaurant}>Restaurant</option>}

                            {fetchuser.role == UserRole.User && <option value={UserRole.User} selected>User</option>}
                            {fetchuser.role != UserRole.User && <option value={UserRole.User}>User</option>}
                        </select>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
