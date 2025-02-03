"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TopBar from '../components/topbar/page';

interface User {
    userid: string;
    name: string;
    email: string;
    username: string;
    address: string;
    filename: string;
    role: {
        id: number;
        role: string;
    };
}

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [emailInput, setEmailInput] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const username = localStorage.getItem('username');
                if (token) {
                    const response = await axios.get('http://localhost:3444/user/getusers/' + username, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setUser(response.data);
                    setEmailInput(response.data.email);
                } else {
                    router.push('/signin');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/signin');
            }
        };

        fetchUserData();
    }, [router]);

    if (!user) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    const update = () => {
        router.push('/updateProfile');
    }

    return (
        <>
            <TopBar />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02]">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-transparent"></div>
                            <div className="h-32 bg-blue-500"></div>
                            <div className="relative -mt-16 flex justify-center">
                                <img
                                    src={'http://localhost:3444/user/getimage/' + user.filename}
                                    alt="Profile Image"
                                    className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                            </div>
                        </div>

                        <div className="px-6 py-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
                                <p className="text-sm text-gray-500 mb-6">@{user.username}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">User ID</p>
                                            <p className="mt-1 text-sm text-gray-900">{user.userid}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Role</p>
                                            <p className="mt-1 text-sm text-gray-900">{user.role.role}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Address</p>
                                            <p className="mt-1 text-sm text-gray-900">{user.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={update}
                                    className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium shadow-md hover:bg-blue-600 transform transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}