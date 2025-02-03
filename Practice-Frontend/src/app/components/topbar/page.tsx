"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import StaffCard from "../staffcard/page";
import { Search, Settings, LogOut, User } from "lucide-react";

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
    const [isSearchFocused, setIsSearchFocused] = useState(false);

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

    const hasAccess = (requiredRole: string): boolean => {
        return user.role.role === requiredRole;
    };

    return (
        <>
            <div className="bg-slate-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between h-16 px-4">
                        {/* Left section */}
                        <div className="flex items-center space-x-4 gap-20">
                            <Link href="/dashboard/" className="text-xl font-bold hover:text-blue-400 transition-colors">
                                HRConnect
                            </Link>
                            <Link href="../../EmailForm" className="text-lg hover:text-blue-400 transition-colors">
                                Email
                            </Link>
                        </div>

                        {/* Center section - Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            {hasAccess("Admin") && (
                                <Link href="/role/" className="hover:text-blue-400 transition-colors font-medium">
                                    Role Management
                                </Link>
                            )}
                            {hasAccess("Manager") && (
                                <Link href="/task/" className="hover:text-blue-400 transition-colors font-medium">
                                    Task Manager
                                </Link>
                            )}
                            {hasAccess("Hr") && (
                                <>
                                    <Link href="/signup/" className="hover:text-blue-400 transition-colors font-medium">
                                        Add Employee
                                    </Link>
                                    <Link href="/staff/" className="hover:text-blue-400 transition-colors font-medium">
                                        Staff Directory
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Right section */}
                        <div className="flex items-center space-x-4">
                            {/* Search bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleKeyUp}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    placeholder="Search staff..."
                                    className={`bg-slate-800 text-white rounded-lg pl-10 pr-4 py-2 w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        isSearchFocused ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            </div>

                            {/* Profile dropdown */}
                            <div className="relative group">
                                <button className="flex items-center space-x-2">
                                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500 transition-all duration-300 group-hover:ring-4">
                                        <img
                                            alt="Avatar"
                                            src={`http://localhost:3444/user/getimage/${user.filename}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </button>

                                {/* Dropdown menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <button
                                        onClick={handleProfile}
                                        className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-slate-700 transition-colors"
                                    >
                                        <User className="h-4 w-4" />
                                        <span>Profile</span>
                                    </button>
                                    {/* <Link href="" className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-slate-700 transition-colors">
                                        <Settings className="h-4 w-4" />
                                        <span>Settings</span>
                                    </Link> */}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-slate-700 text-red-400 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Results Grid */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jsondata ? (
                        jsondata.map((item: any, index: number) => (
                            <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                <StaffCard data={item} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">Loading...</div>
                    )}
                </div>
            </div>
        </>
    );
}