"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar from "../components/topbar/page";

export default function Product() {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const token = localStorage.getItem('token'); // Fetch token from localStorage
                if (!token) {
                    throw new Error("No token found! Please login first.");
                }

                const response = await axios.get('http://localhost:3444/user/all_staffs', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setStaffs(response.data); // Update state with the fetched data
            } catch (err) {
                console.error("Error fetching staff data:", err);
            } finally {
                setLoading(false); // Set loading to false regardless of success or error
            }
        };

        fetchStaffs();
    }, []);

    if (loading) {
        return (
            <>
                <TopBar />
                <div className="flex justify-center items-center h-screen">
                    <p>Loading...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <TopBar />
            <div className="overflow-x-auto m-3">
                <table className="table table-zebra w-full">
                <thead>
                    <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs.map((staff: any, index: number) => (
                    <tr key={index}>
                        <td>
                        <img
                            src={'http://localhost:3444/user/getimage/' + staff.filename}
                            alt="Staff"
                            className="w-16 h-16 rounded-full"
                        />
                        </td>
                        <td>{staff.name}</td>
                        <td>{staff.userid}</td>
                        <td>{staff.username}</td>
                        <td>{staff.email}</td>
                        <td>{staff.address}</td>
                        <td>{staff.role.role}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </>

    );
}
