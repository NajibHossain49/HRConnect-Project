"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import StaffCard from "../staffcard/page";

interface UserRole {
    id: number;
    role: string;
}

interface User {
    userid: number;
    name: string;
    email: string;
    username: string;
    address: string;
    filename: string;
    role: UserRole;
}

export default function TopBar() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [jsondata, setJsondata] = useState<any[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const username = localStorage.getItem("username");
                if (token) {
                    const response = await axios.get(
                        `http://localhost:3444/user/getusers/${username}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    setUser(response.data);
                    console.log(response.data);
                } else {
                    router.push("/signin");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.push("/signin");
            }
        };

        fetchUserData();
    }, [router]);

    if (!user) {
        return <div></div>;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        router.push("/signin");
    };

    const handleProfile = () => {
        router.push("/profile");
    };

    const handleKeyUp = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchName = event.target.value;
        if (searchName === "") {
            setJsondata([]);
        } else {
            try {
                const response = await axios.get(
                    "http://localhost:3444/user/search_staff",
                    { params: { name: searchName } }
                );
                setJsondata(response.data);
            } catch (error) {
                console.error("Error searching for staff:", error);
            }
        }
    };

    // Role-based rendering helper
    const hasAccess = (requiredRole: string): boolean => {
        return user.role.role === requiredRole;
    };

    return (
        <>
            <div className="navbar bg-neutral text-neutral-content">
                <div className="flex-1">
                    <Link href="/dashboard/" className="btn btn-ghost text-xl">
                        Dashboard
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {/* Render links based on roles */}
                        {hasAccess("Admin") && (
                            <li>
                                <Link href="/role/">Role</Link>
                            </li>
                        )}
                        {hasAccess("Manager") && (
                            <li>
                                <Link href="/task/">Task</Link>
                            </li>
                        )}
                        {hasAccess("Hr") && (
                            <li>
                                <Link href="/signup/">Add Employee</Link>
                            </li>
                        )}
                        {hasAccess("Hr") && (
                            <li><Link href="/staff/">Staff</Link></li>
                        )}
                    </ul>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input
                            type="text"
                            onChange={handleKeyUp}
                            placeholder="Search"
                            className="input input-bordered w-24 md:w-auto"
                        />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Avatar"
                                    src={
                                        "http://localhost:3444/user/getimage/" +
                                        user.filename
                                    }
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box w-52"
                        >
                            <li>
                                <button
                                    className=" hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={handleProfile}
                                >
                                    Profile
                                </button>
                            </li>
                            <li>
                                <Link href="">Settings</Link>
                            </li>
                            <li>
                                <button
                                    className=" hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5 m-3">
                {jsondata ? (
                    jsondata.map((item: any, index: number) => (
                        <div key={index}>
                            <StaffCard data={item} />
                        </div>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    );
}
