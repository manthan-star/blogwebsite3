"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        _id: "",
        username: "",
        email: "",
        password: "",
        role: "",
        image: ""
    });

    // useEffect(() => {
    //     // const role = window.sessionStorage.setItem('role', role.data.role);
    //     const userEmail = window.sessionStorage.getItem("userEmail");
    //     const userName = window.sessionStorage.getItem("userName");

    //     if (userEmail && userName) {
    //         router.push('/dashboard');
    //     }

    // }, [router]);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {

            const role = data;
            console.log('.................2', role)
            window.sessionStorage.setItem('role', role.data.role);
            window.sessionStorage.setItem('username', role.data.username);
            window.sessionStorage.setItem('email', role.data.email);
            window.sessionStorage.setItem('image', role.data.image);

            if (role.data.role === 'admin') {
                router.push("/admin")
            } else if (role.data.role === 'author') {
                router.push("/author");
            } else {
                router.push("/dashboard");
            }

        } else {
            setError(data.error);
        }

    };
    return (
        <div className="w-full min-h-screen flex flex-col bg-blue-200 items-center justify-center from-gray-200 to-blue-200 p-6">
            <form action="" onSubmit={handleLogin} className="flex flex-col space-y-4 justify-center bg-white text-black border border-black w-200 h-auto rounded-md">
                <h1 className="text-center font-bold py-5 text-white bg-blue-600 text-2xl">Login Page</h1>
                <div className="px-5">
                    <label className="font-semibold">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="w-full border p-2 rounded"
                        onChange={(e) => {
                            handleChange("username", e.target.value)
                        }} />
                </div>
                <div className="px-5">
                    <label className="font-semibold">Email:</label>
                    <input type="email" id="email" className="w-full border p-2 rounded" onChange={(e) => { handleChange("email", e.target.value) }} />
                </div>
                <div className="px-5">
                    <label className="font-semibold">Password:</label>
                    <input
                        type="text"
                        id="password"
                        className="w-full border p-2 rounded"
                        onChange={(e) => {
                            handleChange("password", e.target.value)
                        }} />
                </div>

                <div className="px-5">
                    <label className="font-semibold">Role:</label>
                    <select id="role" className="w-full border border-black p-2 rounded"
                        onChange={(e) => {
                            handleChange("role", e.target.value)
                        }} >
                        <option className=""
                            value="">-- Select Role --</option>
                        <option className=" " value="admin">Admin</option>
                        <option className="" value="user">User</option>
                        <option className="" value="author">Author</option>
                    </select>
                </div>
                {error && (
                    <p className="flex flex-col pt-2 text-red-500 text-center">
                        {error}
                    </p>
                )}
                <div className="gap-4 flex justify-center">
                    <button type="submit" className="text-black py-2 px-10 border border-black rounded font-bold transition mr-2 hover:bg-blue-600 hover:text-white">
                        Login
                    </button>

                </div>
                <p className="flex justify-center items-center">Don't have on account? <Link href="/user" className="text-black py-2 ml-2 font-bold mr-2 ">
                    New Register
                </Link></p>

            </form>

        </div>
    )
}