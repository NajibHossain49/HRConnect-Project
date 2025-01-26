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
        return <div></div>;
    }

    const update = () => {
        router.push('/updateProfile');
    }

    return (
        <>
            <TopBar />
            <div className='flex justify-center items-center h-screen'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={'http://localhost:3444/user/getimage/' + user.filename} alt="Profile Image" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">ID: {user.userid}</h2>
                        <p>Name: {user.name}</p>
                        <p>UserName: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Address: {user.address}</p>
                        <p>Role: {user.role.role}</p>
                        <div className="card-actions">
                            <button onClick={update} className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
