const Cookies = require("js-cookie");
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const Navbar = () => {

    const token = Cookies.get("token");
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/");
        }
    }, [token, router]);

    const logout = () => {
        Cookies.remove("token");
        router.push("/");
    };
    return (
        <div className="navbar bg-white justify-end px-2">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                    <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.85714 0.661011H11.1429C11.5952 0.661011 12.0174 0.780949 12.3178 0.980394C12.6182 1.1798 12.75 1.42391 12.75 1.64389C12.75 1.86387 12.6182 2.10797 12.3178 2.30738C12.0174 2.50683 11.5952 2.62676 11.1429 2.62676H1.85714C1.40484 2.62676 0.982648 2.50683 0.682214 2.30738C0.381838 2.10797 0.25 1.86387 0.25 1.64389C0.25 1.42391 0.381838 1.1798 0.682214 0.980394C0.982648 0.780949 1.40484 0.661011 1.85714 0.661011ZM14.8571 10.524H24.1429C24.5952 10.524 25.0174 10.644 25.3178 10.8434C25.6182 11.0428 25.75 11.2869 25.75 11.5069C25.75 11.7269 25.6182 11.971 25.3178 12.1704C25.0174 12.3698 24.5952 12.4898 24.1429 12.4898H14.8571C14.4048 12.4898 13.9826 12.3698 13.6822 12.1704C13.3818 11.971 13.25 11.7269 13.25 11.5069C13.25 11.2869 13.3818 11.0428 13.6822 10.8434C13.9826 10.644 14.4048 10.524 14.8571 10.524ZM1.85714 5.59252H24.1429C24.5952 5.59252 25.0174 5.71246 25.3178 5.9119C25.6182 6.11131 25.75 6.35541 25.75 6.57539C25.75 6.79537 25.6182 7.03948 25.3178 7.23889C25.0174 7.43833 24.5952 7.55827 24.1429 7.55827H1.85714C1.40484 7.55827 0.982648 7.43833 0.682214 7.23889C0.381838 7.03948 0.25 6.79537 0.25 6.57539C0.25 6.35541 0.381838 6.11131 0.682214 5.9119C0.982648 5.71246 1.40484 5.59252 1.85714 5.59252Z" fill="#1D1D1D" stroke="white" stroke-width="0.5" />
                    </svg>

                </div>
                <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                    <li><a>Liste des Restaurants</a></li>
                    <li><a onClick={logout}>Déconnexion</a></li>
                </ul>
            </div>
        </div>
    );
};
export default Navbar;