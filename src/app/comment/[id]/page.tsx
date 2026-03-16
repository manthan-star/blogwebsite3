"use client"

import { Navbar } from "@/component/layout/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInfo {
    _id: string;
    username: string;
}

interface BlogInfo {
    _id: string;
    title: string;
}

interface Comment {
    _id: string;
    userId: string;
    blogId: string;
}

export default function CommentEdit() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [open, setOpen] = useState(true);
    const [user, setUser] = useState<UserInfo[]>([]);
    const [blog, setBlog] = useState<BlogInfo[]>([]);
    const [commentData, setCommentData] = useState<Comment | null>(null);
    const [formdatas, setFormData] = useState({
        userId: "",
        blogId: "",
        content: "",
    });

    useEffect(() => {
        if (id) {
            fetchComment();
            fetchUser();
            fetchBlog();
        }
    }, [id])

    const fetchComment = async () => {
        try {
            const res = await fetch(`/api/Comment/${id}`);
            const data = await res.json();
            if (data.success && data.data) {
                const stu = data.data;
                setCommentData(stu);

                const userId = typeof stu.userId === 'object' && stu.userId?._id
                    ? stu.userId._id
                    : typeof stu.userId === 'string'
                        ? stu.userId
                        : "";

                const blogId = typeof stu.blogId === 'object' && stu.blogId?._id
                    ? stu.blogId._id
                    : typeof stu.blogId === 'string'
                        ? stu.blogId
                        : "";

                setFormData({
                    userId: userId,
                    blogId: blogId,
                    content: stu.content,
                });
                console.log('..............', setFormData);
            }
        } catch (error) {
            console.error("Error fetching comment:", error);
        }
    };

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/User?dropdown');
            const data = await res.json();
            if (data.success && data.data) {
                setUser(data.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchBlog = async () => {
        try {
            const res = await fetch('/api/Blog?dropdown');
            const data = await res.json();
            if (data.success && data.data) {
                setBlog(data.data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (formdatas) {

            const res = await fetch(`/api/Comment/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: formdatas.userId,
                    blogId: formdatas.blogId,
                    content: formdatas.content,
                }),
            });

            if (res.ok) {
                alert("Comment updated successfully");
                router.push('/comment');
            } else {
                alert("Failed to update Comment");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col">

            <Navbar  />

            <div className="flex flex-1 pt-15 overflow-hidden">

                <div className={`flex-1 flex flex-col transition-all duration-300 bg-gray-200`}>

                    <div className="flex-1 overflow-auto py-6 px-2 mb-12">

                        {/* Back Button */}
                        <button onClick={() => router.back()} className="flex font-bold text-white items-center justify-end gap-2 rounded-md mb-5 mx-4 px-4 py-2 hover:bg-black hover:text-white pl-auto bg-black"><ArrowLeft size={30} /> <span>Back to Blog</span></button>


                        <div className="flex flex-col bg-white shadow-lg rounded-2xl mx-auto">

                            <h1 className="flex text-2xl border rounded-t-2xl font-bold bg-black text-white mb-6 border-b-2 p-6">Blog Edit Form</h1>

                            <form onSubmit={handleSubmit} className="w-full space-y-4 px-6 pb-6 text-black">
                                
                                <div>
                                    <label className="font-semibold">UserId:</label>
                                    <select
                                        id="userId"
                                        name="userId"
                                        className="w-full border p-2 rounded"
                                        value={formdatas.userId}
                                        onChange={handleChange}
                                    >
                                        <option value=""> Select Category Name</option>
                                        {user.map((sc) => (
                                            <option key={sc._id} value={sc._id}>
                                                {sc.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-semibold">BlogId:</label>
                                    <select
                                        id="blogId"
                                        name="blogId"
                                        className="w-full border p-2 rounded"
                                        value={formdatas.blogId}
                                        onChange={handleChange}
                                    >
                                        <option value=""> Select Category Name</option>
                                        {blog.map((sc) => (
                                            <option key={sc._id} value={sc._id}>
                                                {sc.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-semibold">Content:</label>
                                    <input
                                        type="text"
                                        name="content"
                                        id="content"
                                        className="w-full border p-2 rounded"
                                        value={formdatas.content}
                                        onChange={handleChange} />
                                </div>

                                {/* Update & Cancel Button */}
                                <div className="gap-4 flex justify-end">
                                    <Link href="/blog" className=" bg-white border font-bold text-black py-2 px-2 rounded hover:text-red-600 transition ml-2">
                                        Cancel
                                    </Link>
                                    <button type="submit" className=" bg-black text-white border py-2 px-2 rounded font-bold hover:bg-white hover:text-black transition mr-2">
                                        Update Comment
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