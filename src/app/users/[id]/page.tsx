"use client"
import { Navbar } from "@/component/layout/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    _id: string;
    username: string;
    birth: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    email: string;
    city: string;
    password: string;
    phone: number;
    role: 'admin' | 'user' | 'author';
    image: string;
    url: string;
}

export default function UsersEdit() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [open, setOpen] = useState(true);
    const [userData, setUserData] = useState<User | null>(null);
    const [formdatas, setFormData] = useState({
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
        url: "",
    });
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const res = await fetch(`/api/User/${id}`);
            const data = await res.json();
            if (data.success && data.data) {
                const user = data.data;
                setUserData(user);

                setFormData({
                    username: user.username,
                    birth: user.birth,
                    age: user.age,
                    gender: user.gender,
                    email: user.email,
                    city: user.city,
                    phone: user.phone,
                    password: user.password,
                    role: user.role,
                    image: user.image,
                    url: user.url,
                });
                console.log('..............', setFormData);
            }
        } catch (error) {
            console.error("Error fetching User:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let data = { fileName: "", url: "" };
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch("/api/UserImage", {
                method: "POST",
                body: formData,
            });
            data = await res.json();
        } else {
            data.fileName = formdatas.image;
            data.url = userData?.url || "";
        }

        if (formdatas) {

            const res = await fetch(`/api/User/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formdatas.username,
                    birth: formdatas.birth.toString(),
                    age: formdatas.age.toString(),
                    gender: formdatas.gender,
                    email: formdatas.email,
                    city: formdatas.city,
                    phone: formdatas.phone.toString(),
                    password: formdatas.password,
                    role: formdatas.role,
                    image: data.fileName,
                    url: data.url,
                }),
            });

            if (res.ok) {
                alert("User updated successfully");
                router.push('/users');
            } else {
                alert("Failed to update User");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1 pt-15 overflow-hidden">

                <div className={`flex-1 flex flex-col transition-all duration-300 bg-gray-200`}>

                    <div className="flex-1 overflow-auto py-6 px-2 mb-12">

                        {/* Back Button */}
                        <button onClick={() => router.back()} className="flex font-bold text-black items-center justify-end gap-2 rounded-md mb-5 mx-4 px-4 py-2 pl-auto bg-white"><ArrowLeft size={30} /> <span>Back to User</span></button>


                        <div className="flex flex-col bg-white shadow-lg rounded-2xl mx-auto">

                            <h1 className="flex text-2xl border rounded-t-2xl font-bold bg-blue-600 text-white mb-6 border-b-2 p-6">User Edit Form</h1>

                            <form onSubmit={handleSubmit} className="w-full space-y-4 px-6 pb-6 text-black">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-semibold">Username:</label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="w-full border p-2 rounded"
                                            value={formdatas.username}
                                            onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className="font-semibold">Birth:</label>
                                        <input
                                            type="date"
                                            name="birth"
                                            id="birth"
                                            className="w-full border p-2 rounded"
                                            value={formdatas.birth}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-semibold">Age:</label>
                                        <input
                                            type="number"
                                            name="age"
                                            id="age"
                                            className="w-full border p-2 rounded"
                                            value={formdatas.age}
                                            onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className="font-semibold">Gender:</label>
                                        <select id="gender" name="gender" value={formdatas.gender} className="w-full border border-black p-2 rounded" onChange={handleChange}>
                                            <option className="text-black" value="">-- Select Gender --</option>
                                            <option className="text-black" value="Male">Male</option>
                                            <option className="text-black" value="Female">Female</option>
                                            <option className="text-black" value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-semibold">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="w-full border p-2 rounded"
                                            value={formdatas.email}
                                            onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className="font-semibold">City:</label>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            className="w-full border p-2 rounded"
                                            value={formdatas.city}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-semibold">Phone:</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            id="phone"
                                            className="w-full border p-2 rounded"
                                            value={formdatas.phone}
                                            onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className="font-semibold">Password:</label>
                                        <input
                                            type="text"
                                            name="password"
                                            id="password"
                                            className="w-full border p-2 rounded"
                                            value={formdatas.password}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-semibold">Role:</label>
                                        <select id="roler" name="role" value={formdatas.role} className="w-full border border-black p-2 rounded" onChange={handleChange}>
                                            <option className="text-black" value="">-- Select Role --</option>
                                            <option className="text-black" value="admin">Admin</option>
                                            <option className="text-black" value="user">User</option>
                                            <option className="text-black" value="author">Author</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="font-semibold">Select Image:</label>

                                        {/* Image Input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            // value={formdatas.title}
                                            // onChange={handleChange}
                                            className="w-full border p-2 rounded"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                {/* Update & Cancel Button */}
                                <div className="gap-4 flex justify-end">
                                    <Link href="/users" className=" bg-white border font-bold text-black py-2 px-2 rounded hover:text-red-600 transition ml-2">
                                        Cancel
                                    </Link>
                                    <button type="submit" className=" border bg-white text-black py-2 px-2 rounded font-bold hover:text-green-600 transition mr-2">
                                        Update User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

}