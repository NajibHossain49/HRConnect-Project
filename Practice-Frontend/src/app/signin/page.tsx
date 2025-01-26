"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import NavBar from "../components/navbar/page";


interface FormData {
    username: string;
    password: string;
}

export default function Signin() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3444/auth/signin', formData);
            console.log(response.data);

            const token = response.data;
            console.log(token.access_token);
            localStorage.setItem('token', token.access_token);
            localStorage.setItem('username', formData.username);

            // reactHotToast.toast.success('Sign in successful');
            router.push('/dashboard');
        } catch (error) {
            // console.error('Error signing in:', error);
            // reactHotToast.toast.error('Sign in failed. Please check your credentials.');
            alert('Sign in failed. Please check your credentials.');
        }
    };
    return (
        <>
           <NavBar/>
            <div className="flex items-center justify-center gap-2 mt-3 mb-3">
                <h1 className="">Sign in</h1>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className=" flex items-center justify-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input id="username" name="username" type="text" className="input input-bordered" placeholder="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className=" flex items-center justify-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input id="password" name="password" type="password" className="input input-bordered" placeholder="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="flex justify-center">
                    <button className="btn btn-active">Sign in</button>
                </div>
            </form>
        </>
    )
}