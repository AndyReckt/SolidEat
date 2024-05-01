"use client";
/* eslint-disable react/no-unescaped-entities */
import { User, UserRole } from "@/_utils/_schemas";
const Cookies = require("js-cookie");
import { set } from "zod";

export default function fetchuser(fetchuser: User) {

    return (
        <div className="py-3">
            <div className="card card-side shadow-xl bg-slate-400 text-black">
                <div className="card-body">
                    <h4 className="card-title">{fetchuser.username}</h4>
                    <p>nom : {fetchuser.name}</p>
                    <p>email : {fetchuser.email}</p>
                    <p>role : {fetchuser.role}</p>
                    <button
                        className="btn btn-primary mt-3">
                        Change Role to
                    </button>
                </div>
            </div>
        </div>

    );
}
