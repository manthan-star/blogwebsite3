"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, DeleteIcon, Edit2Icon, EditIcon, ViewIcon } from "lucide-react";
import { ConfirmModal } from "@/component/ui/confirm";
import { Navbar } from "@/component/layout/Navbar";

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
    role: 'admin'| 'user'| 'reader';
    image: string;
    url: string;
}

export default function UserPage() {
    const router = useRouter();
    const [user, setUser] = useState<User[]>([]);
    const [] = useState<string>("");
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [open, setOpen] = useState(true)

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const respo = await fetch("/api/User")
        const data = await respo.json();
        console.log('.................', data.data);
        setUser(data.data)
    }

    const handleDelete = async () => {

        const resp = await fetch(`/api/User/${selectedUser?._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })

        console.log({ resp })

        if (resp.ok) {
            getData()
        }
        setSelectedUser(null);
        setDeleteConfirmOpen(false);
    }

    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1 pt-15 overflow-hidden">


                <div className={`flex-1 flex flex-col transition-all duration-300 bg-gray-200`}>


                    <div className="sticky flex mx-4">
                        <button onClick={() => router.back()} className="bg-white text-black font-bold rounded-full p-1 my-7 hover:bg-blue-600 hover:text-white"><ArrowLeft size={30} /></button>

                        <h1 className="flex text-black flex-col text-[24px] font-semibold justify-center items-center m-auto border-b-4">User Details</h1>

                        {/* <button
                            className="flex font-bold text-white items-center gap-2 rounded-md px-4 my-7 mx-4 hover:bg-black hover:text-white pl-auto bg-blue-600"
                            onClick={() => router.push("/dashboard/director/add")}>
                            <FaPlus />
                            <span>Add Director</span>
                        </button> */}
                    </div>

                    <div className="flex-1 overflow-y-scroll max-h-127.5 mx-3 border border-gray-200 bg-white rounded-md text-black">

                        <table className="border-collapse w-full border-b-2 bg-white border-gray-300">
                            <thead className="sticky top-0 bg-gray-50 z-10 border-b-2 border-gray-300">
                                <tr className="font-semibold">
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Sr.No</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Username</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Birth</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Age</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Gender</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Email</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">City</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Password</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Phone</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Role</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Filename</th>
                                    <th className="p-2 w-50">Action</th>
                                </tr>
                            </thead>
                            <tbody className="font-semibold">

                                {user.map((dir, i) => (
                                    <tr key={i}>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{i + 1}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.username}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.birth}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.age}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.gender}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.email}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.city}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.password}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.phone}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.role}</td>
                                        <td className="py-2 my-2 flex justify-center items-center">
                                            <Image
                                                src={`/userImage/${dir.image}`}
                                                width={50}
                                                height={54}
                                                alt={`${dir.image}`}
                                            /></td>
                                        <td className="border-l-2 border-gray-300">
                                            {/* button delete and edit */}
                                            <div className="flex justify-center gap-2">
                                                <Link className="p-2 text-green-600 font-bold   " href={`/users/${dir._id}`}>Edit</Link>

                                                <button className="p-2 text-red-600 font-bold  hover:"
                                                    onClick={() => {
                                                        setSelectedUser(dir);
                                                        setDeleteConfirmOpen(true);
                                                    }}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ConfirmModal
                id="delete_model"
                open={deleteConfirmOpen}
                title="Delete User"
                message={`Are you sure you want to delete the user "${selectedUser?.username}"?`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteConfirmOpen(false)}
                confirmText="Confirm"
                cancelText="Cancel"
            />
        </div>
    );
}