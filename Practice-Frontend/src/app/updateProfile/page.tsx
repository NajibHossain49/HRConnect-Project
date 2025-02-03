"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TopBar from '../components/topbar/page';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast'

interface FormData {
    name: string;
    email: string;
    username: string;
    address: string;
    myfile: File | null;
}

export default function Profile() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        username: '',
        address: '',
        myfile: null,
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

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
                    setFormData(response.data);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const token = localStorage.getItem('token');
                const username = localStorage.getItem('username');

                await axios.put('http://localhost:3444/user/update_profile/' + formData.username, {
                    name: formData.name,
                    email: formData.email,
                    address: formData.address
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                toast.success('Profile updated successfully!');
                localStorage.removeItem('username');
                localStorage.setItem('username', formData.username);
                router.push('/profile');

            } catch (error) {
                console.error('Error during update:', error);
                toast.error('Update failed. Please try again.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'myfile') {
            setFormData({ ...formData, [name]: files ? files[0] : null });
            setErrors({ ...errors, [name]: null });
        } else {
            setFormData({ ...formData, [name]: value });
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = (formData: FormData): Partial<FormData> => {
        const errors: Partial<FormData> = {};

        if (!formData.name) {
            errors.name = 'Name is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.username) {
            errors.username = 'UserName is required';
        }

        if (!formData.address) {
            errors.address = 'Address is required';
        }

        return errors;
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="min-h-screen bg-gray-50">
                <TopBar />
                <div className="max-w-xl mx-auto px-4 py-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
                        <p className="mt-2 text-gray-600">Manage your account information</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your full name"
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your address"
                            />
                            {errors.address && (
                                <p className="text-red-600 text-sm">{errors.address}</p>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}