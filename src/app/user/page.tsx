"use client"

import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function UserPage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [open, setOpen] = useState(true);
    const [userData, setFormData] = useState({
        username: "",
        birth: "",
        age: "",
        gender: "",
        email: "",
        city: "",
        phone: "",
        password: "",
        role: "",
        image: "",
    });
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    const handleChangeUser = (field: string, value: string) => {
        setFormData((prev) =>
            ({ ...prev, [field]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return alert("Please Select a Image file");

        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch("/api/UserImage", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (data.success) {


            const resp = await fetch('/api/User', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userData.username,
                    birth: userData.birth,
                    age: userData.age,
                    gender: userData.gender,
                    email: userData.email,
                    city: userData.city,
                    phone: userData.phone,
                    password: userData.password,
                    role: userData.role,
                    image: data.fileName,
                    url: data.url,
                }),
            })
            const datas = data.image;
            console.log(resp)
            if (resp.ok) {
                window.sessionStorage.setItem('image', datas.image);

                setSuccess(true)
                router.push("/login")
            }
            setImageUrl(data.url);
        } else {
            alert("Upload faild: " + data.error)
        }
    }

    return (
        <div className="w-full min-h-screen flex bg-blue-200 items-center justify-center p-6">
            <form action="" onSubmit={handleSubmit} className="pb-5 space-y-4 text-black justify-center border bg-white w-200 h-auto rounded-md">
                <h1 className="text-center font-bold mb-5 py-5 text-2xl bg-blue-600 text-white">Registration Form</h1>
                <div className="grid grid-cols-2 gap-8 px-5">
                    <div>
                        <label className="font-semibold">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full border p-2 rounded"
                            onChange={(e) => {
                                handleChangeUser("username", e.target.value)
                            }} />
                    </div>
                    <div>
                        <label className="font-semibold">Birth:</label>
                        <input
                            type="date"
                            id="birth"
                            className="w-full border p-2 rounded"
                            onChange={(e) => {
                                handleChangeUser("birth", e.target.value)
                            }} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 px-5">
                    <div>
                        <label className="font-semibold">Age:</label>
                        <input
                            type="number"
                            id="age"
                            className="w-full border p-2 rounded"
                            onChange={(e) => {
                                handleChangeUser("age", e.target.value)
                            }} />
                    </div>
                    <div>
                        <label className="font-semibold">Gender:</label>
                        <select id="gender" className="w-full border border-black p-2 rounded" onChange={(e) => {
                            handleChangeUser("gender", e.target.value)
                        }}>
                            <option className="text-black" value="">-- Select Gender --</option>
                            <option className="text-black" value="Male">Male</option>
                            <option className="text-black" value="Female">Female</option>
                            <option className="text-black" value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 px-5">
                    <div>
                        <label className="font-semibold">Email:</label>
                        <input type="email" id="email" className="w-full border p-2 rounded" onChange={(e) => { handleChangeUser("email", e.target.value) }} />
                    </div>
                    <div>
                        <label className="font-semibold">City:</label>
                        <input type="text" id="city" className="w-full border p-2 rounded" onChange={(e) => { handleChangeUser("city", e.target.value) }} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 px-5">
                    <div>
                        <label className="font-semibold">Phone:</label>
                        <input type="number" id="phone" className="w-full border p-2 rounded" onChange={(e) => { handleChangeUser("phone", e.target.value) }} />
                    </div>
                    <div>
                        <label className="font-semibold">Password:</label>
                        <input
                            type="text"
                            id="password"
                            className="w-full border p-2 rounded"
                            onChange={(e) => {
                                handleChangeUser("password", e.target.value)
                            }} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 px-5">
                    <div>
                        <label className="font-semibold">Role:</label>
                        <select id="role" className="w-full border border-black p-2 rounded"
                            onChange={(e) => {
                                handleChangeUser("role", e.target.value)
                            }}>
                            <option className="text-black"
                                value="">-- Select Role --</option>
                            <option className="text-black" value="admin">Admin</option>
                            <option className="text-black" value="user">User</option>
                            <option className="text-black" value="author">Author</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold">Select Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                        />

                    </div>
                </div>
                <div className="gap-4 flex justify-center">
                    <button type="submit" className="text-black py-2 px-10 border border-black rounded font-bold transition mr-2 hover:bg-blue-600 hover:text-white">
                        Register
                    </button>
                </div>
                <p className="flex justify-center items-center">Don't have on account? <Link href="/login" className="text-black py-2 ml-2 font-bold mr-2 ">
                    Login
                </Link></p>
            </form>
        </div>
    )
}