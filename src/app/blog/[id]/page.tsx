"use client"

import { Navbar } from "@/component/layout/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface CategoryInfo {
    _id: string;
    category: string;
}

interface UserInfo {
    _id: string;
    username: string;
}

interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    publishAt: Date;
    category: string;
    userId: string;
    image: string;
    url: string;
}

export default function BlogEdit() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [open, setOpen] = useState(true);
    const [category, setCategory] = useState<CategoryInfo[]>([]);
    const [user, setUser] = useState<UserInfo[]>([]);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [blogData, setBlogData] = useState<Blog | null>(null);
    const [formdatas, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        publishAt: "",
        category: "",
        userId: "",
        image: "",
        url: "",
    });
    const [role, setRole] = useState("");
    const [username, setUsernames] = useState("");

    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const role = sessionStorage.getItem("role")
        const username = sessionStorage.getItem("username")
        console.log('...............', role)
        setRole(role || "");
        setUsernames(username || "");
    }, []);

    useEffect(() => {
        if (id) {
            fetchBlog();
            fetchCategory();
            fetchUser();
        }
    }, [id])


    const fetchBlog = async () => {
        try {
            const res = await fetch(`/api/Blog/${id}`);
            const data = await res.json();
            if (data.success && data.data) {
                const stu = data.data;
                setBlogData(stu);

                const category = typeof stu.category === 'object' && stu.category?._id
                    ? stu.category._id
                    : typeof stu.category === 'string'
                        ? stu.category
                        : "";

                const userId = typeof stu.userId === 'object' && stu.userId?._id
                    ? stu.userId._id
                    : typeof stu.userId === 'string'
                        ? stu.userId
                        : "";

                setFormData({
                    title: stu.title,
                    slug: stu.slug,
                    content: stu.content,
                    excerpt: stu.excerpt,
                    publishAt: stu.publishAt.toString(),
                    category: category,
                    userId: userId,
                    image: stu.image,
                    url: stu.url,
                });
                console.log('..............', setFormData);
            }
        } catch (error) {
            console.error("Error fetching student:", error);
        }
    };

    const fetchCategory = async () => {
        try {
            const res = await fetch('/api/Category?dropdown');
            const data = await res.json();
            if (data.success && data.data) {
                setCategory(data.data);
            }
        } catch (error) {
            console.error("Error fetching schools:", error);
        }
    };
    const fetchUser = async () => {
        try {
            const res = await fetch('/api/User');
            const data = await res.json();
            if (data.success && data.data) {
                setUser(data.data);
                const authors = data.data.filter((User: any) => User.role === "author");
                console.log("000000000000000000000000000000000", authors)
                setUsers(authors)
            }
        } catch (error) {
            console.error("Error fetching schools:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

            const res = await fetch("/api/BlogImage", {
                method: "POST",
                body: formData,
            });
            data = await res.json();
        } else {
            data.fileName = formdatas.image;
            data.url = blogData?.url || "";
        }

        if (formdatas) {

            const res = await fetch(`/api/Blog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formdatas.title,
                    slug: formdatas.slug,
                    content: formdatas.content,
                    excerpt: formdatas.excerpt,
                    publishAt: formdatas.publishAt.toString(),
                    category: formdatas.category,
                    userId: formdatas.userId,
                    image: data.fileName,
                    url: data.url, formdatas
                }),
            });

            if (res.ok) {
                alert("Blog updated successfully");
                router.push('/blog');
            } else {
                alert("Failed to update student");
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
                        <button onClick={() => router.back()} className="flex font-bold text-black items-center justify-end gap-2 rounded-md mb-5 mx-4 px-4 py-2 hover:bg-blue-600 hover:text-white pl-auto bg-white"><ArrowLeft size={30} /> <span>Back to Blog</span></button>


                        <div className="flex flex-col bg-white shadow-lg rounded-2xl mx-auto">

                            <h1 className="flex text-2xl border rounded-t-2xl font-bold bg-blue-600 text-white mb-6 border-b-2 p-6">Blog Edit Form</h1>

                            {role === 'admin' &&
                                <form onSubmit={handleSubmit} className="w-full space-y-4 text-black px-6 pb-6">

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">Title:</label>
                                            <input
                                                type="text"
                                                id="title"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.title)}
                                                onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Slug:</label>
                                            <input
                                                type="text"
                                                id="slug"
                                                name="slug"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.slug)}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">Content:</label>
                                            <input
                                                type="text"
                                                id="content"
                                                name="content"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.content)}
                                                onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Excerpt:</label>
                                            <input
                                                type="text"
                                                id="excerpt"
                                                name="excerpt"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.excerpt)}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">PublishAt:</label>
                                            <input
                                                type="date"
                                                id="publishAt"
                                                name="publishAt"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.publishAt)}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Category:</label>
                                            <select
                                                id="category"
                                                name="category"
                                                className="w-full border p-2 rounded"
                                                value={formdatas.category}
                                                onChange={handleChange}
                                            >
                                                <option value=""> Select Category Name</option>
                                                {category.map((sc) => (
                                                    <option key={sc._id} value={sc._id}>
                                                        {sc.category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">Select User:</label>
                                            <select
                                                id="userId"
                                                name="userId"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.userId)}
                                                onChange={handleChange}
                                            >
                                                <option value=""> Select User Name</option>
                                                {user.map((sc) => (
                                                    <option key={sc._id} value={sc._id}>
                                                        {sc.username}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="font-semibold">Select Image:</label>

                                            {/* Image Input */}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                // onChange={handleChange}
                                                className="w-full border p-2 rounded"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>


                                    {/* Submit Button */}
                                    <div className="gap-4 flex justify-end">
                                        <Link href="/post" className=" bg-white border font-bold text-black py-2 px-2 rounded transition ml-2">
                                            Cancel
                                        </Link>
                                        <button type="submit" className=" bg-white text-black border py-2 px-2 rounded font-bold transition mr-2">
                                            Create Post
                                        </button>
                                    </div>
                                </form>
                            }
                            {role === 'author' &&
                                <form onSubmit={handleSubmit} className="w-full space-y-4 text-black px-6 pb-6">

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">Title:</label>
                                            <input
                                                type="text"
                                                id="title"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.title)}
                                                onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Slug:</label>
                                            <input
                                                type="text"
                                                id="slug"
                                                name="slug"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.slug)}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">Content:</label>
                                            <input
                                                type="text"
                                                id="content"
                                                name="content"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.content)}
                                                onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Excerpt:</label>
                                            <input
                                                type="text"
                                                id="excerpt"
                                                name="excerpt"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.excerpt)}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">PublishAt:</label>
                                            <input
                                                type="date"
                                                id="publishAt"
                                                name="publishAt"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.publishAt)}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Category:</label>
                                            <select
                                                id="category"
                                                name="category"
                                                className="w-full border p-2 rounded"
                                                value={formdatas.category}
                                                onChange={handleChange}
                                            >
                                                <option value=""> Select Category Name</option>
                                                {category.map((sc) => (
                                                    <option key={sc._id} value={sc._id}>
                                                        {sc.category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">Select User:</label>
                                            <select
                                                id="userId"
                                                name="userId"
                                                className="w-full border p-2 rounded"
                                                value={(formdatas.userId)}
                                                onChange={handleChange}
                                            >
                                                <option value=""> Select User Name</option>
                                                {users.map((sc) => (
                                                    <option key={sc._id} value={sc._id}>
                                                        {sc.username}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="font-semibold">Select Image:</label>

                                            {/* Image Input */}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                // onChange={handleChange}
                                                className="w-full border p-2 rounded"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>


                                    {/* Submit Button */}
                                    <div className="gap-4 flex justify-end">
                                        <Link href="/post" className=" bg-white border font-bold text-black py-2 px-2 rounded transition ml-2">
                                            Cancel
                                        </Link>
                                        <button type="submit" className=" bg-black text-white py-2 px-2 rounded font-bold transition mr-2">
                                            Create Post
                                        </button>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>

            </div >
        </div >
    );
}