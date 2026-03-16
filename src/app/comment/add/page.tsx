"use client"

import { Navbar } from "@/component/layout/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BlogInfo {
    _id: string;
    title: string;
}
interface UserInfo {
    _id: string;
    username: string;
}

export default function StudentPage() {
    const router = useRouter();
    const [username, setUsername] = useState<UserInfo[]>([]);
    const [blogId, setBlog] = useState<BlogInfo[]>([]);
    const [open, setOpen] = useState(true);
    const [catData, setFormData] = useState({
        userId: "",
        blogId: "",
        content: "",
    });
    const [success, setSuccess] = useState<boolean>(false);


    useEffect(() => {
        getDropdownlist();
    }, []);

    const getDropdownlist = async () => {
        const respo = await fetch("/api/User/dropdown")
        // console.log("dad", respo.json);
        const data = await respo.json();
        console.log('............................',data.data)
        setUsername(data.data)
    }
    useEffect(() => {
        getDropDownlist();
    }, []);

    const getDropDownlist = async () => {
        const respo = await fetch("/api/Blog/dropdown")
        // console.log("dad", respo.json);
        const data = await respo.json();
        console.log('............................',data.data)
        setBlog(data.data)
    }

    const handleChangeCategory = (field: string, value: string) => {
        setFormData((prev) =>
            ({ ...prev, [field]: value }));
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();



        const resp = await fetch('/api/Comment', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: catData.content,
                userID: catData.userId,
                blogId: catData.blogId,
            }),
        })
        console.log(resp)
        if (resp.ok) {
            setSuccess(true)
            router.push("/comment")
        } else {
            alert("Data not found")
        }
    };

    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1 pt-15 overflow-hidden">


                <div className="flex-1 flex flex-col transition-all duration-300 bg-gray-200 ">

                    <div className="flex-1 overflow-auto py-6 px-2 mb-12">

                        {/* Back Button */}
                        <button onClick={() => router.back()} className="flex font-bold text-black items-center justify-end gap-2 rounded-md mb-5 mx-4 px-4 py-2 pl-auto bg-white ">
                            <ArrowLeft size={30} /><span>Back to Comment</span></button>


                        <div className="flex flex-col bg-white shadow-lg rounded-2xl mx-auto">

                            <h1 className="flex text-2xl border rounded-t-2xl font-bold bg-blue-600 text-white mb-6 border-b-2 p-6">Comment Add Form</h1>

                            <form onSubmit={handleSubmit} className="w-full text-black space-y-4 px-6 pb-6">

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-semibold">Content:</label>
                                        <input
                                            type="text"
                                            id="content"
                                            className="w-full border p-2 rounded"
                                            onChange={(e) => {
                                                handleChangeCategory("content", e.target.value)
                                            }} />
                                    </div>
                                    <div>
                                        <label className="font-semibold">Blog Title:</label>
                                        <select
                                            id="blogId"
                                            className="w-full border p-2 rounded text-black"
                                            onChange={(e) => {
                                                handleChangeCategory("blogId", e.target.value)
                                            }}
                                        >
                                            <option value="" className="text-black">Select Blog Title</option>
                                            {blogId.map((cate) => (
                                                <option key={cate._id} value={cate._id}>
                                                    {cate.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>                              
                                
                                <div className="grid grid-cols-2 gap-4">

                                    
                                    <div>
                                        <label htmlFor="userId" className="font-semibold">User Name:</label>
                                        <select
                                            id="userId"
                                            className="w-full border p-2 rounded text-black"
                                            onChange={(e) => {
                                                handleChangeCategory("userId", e.target.value)
                                            }}
                                        >
                                            <option value="" className="text-black"> Select userId</option>
                                            {username.map((cate) => (
                                                <option key={cate._id} value={cate._id}>
                                                    {cate.username}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="">

                                </div>
                                {/* Submit Button */}
                                <div className="gap-4 flex justify-end">
                                    <Link href="/category" className=" bg-white border font-bold text-black py-2 px-2 rounded transition ml-2 hover:bg-black hover:text-white">
                                        Cancel
                                    </Link>
                                    <button type="submit" className=" bg-white text-black py-2 px-2 border rounded font-bold transition mr-2">
                                        Create Comment
                                    </button>
                                </div>
                            </form>

                            {success && <p className="text-green-600 mt-4 font-semibold">Form submitted successfully ✅</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
