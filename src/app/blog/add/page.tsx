"use client"

import { Navbar } from "@/component/layout/Navbar";
import { MDEditor } from "@/component/Mdeditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CategoryInfo {
    _id: string;
    category: string;
}

interface UserInfo {
    _id: string;
    username: string;
}


export default function PostPage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [category, setCategory] = useState<CategoryInfo[]>([]);
    const [username, setUsername] = useState<UserInfo[]>([]);
    const [user, setUser] = useState<UserInfo[]>([]);
    const [markdown, setMarkdown] = useState<string | undefined>("");
    const [open, setOpen] = useState(true);
    const [postData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        userId: "",
        publishAt: "",
        category: "",
        image: "",
    });

    const [success, setSuccess] = useState<boolean>(false);
    const [usernames, setUsernames] = useState("");
    const [role, setRole] = useState("");
    // const MDEditor = dynamic(() => {
    //     const [text, setText] = useState([]);
    // })

    useEffect(() => {
        const role = sessionStorage.getItem("role")
        const username = sessionStorage.getItem("username")
        console.log('...............', role)
        setRole(role || "");
        setUsernames(username || "");
    }, []);

    useEffect(() => {
        getDropdownlist();
    }, []);

    const getDropdownlist = async () => {
        const respo = await fetch("/api/Category/dropdown")
        // console.log("dad", respo.json);
        const data = await respo.json();
        console.log(data.data)
        setCategory(data.data)
    }

    useEffect(() => {
        getDropDownlist();
    }, []);

    const getDropDownlist = async () => {
        const respo = await fetch("/api/User")
        // console.log("dad", resp.json);
        const data = await respo.json();
        // console.log("-----------------", data);
        setUsername(data.data)
        const authors = data.data.filter((User: any) => User.role === "author");
        console.log("000000000000000000000000000000000", authors)
        setUser(authors)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    const handleChangeBlog = (field: string, value: string) => {
        setFormData((prev) =>
            ({ ...prev, [field]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return alert("Please select a image first!");

        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("/api/BlogImage", {
            method: "POST",
            body: formData,
        });


        const data = await res.json();
        if (data.success) {
            const resp = await fetch('/api/Blog', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: postData.title,
                    slug: postData.slug,
                    content: markdown,
                    excerpt: postData.excerpt,
                    publishAt: postData.publishAt.toString(),
                    category: postData.category,
                    userId: postData.userId,
                    image: data.fileName,
                    url: data.url,
                }),
            })
            console.log(resp)
            if (resp.ok) {
                setSuccess(true)
                router.push("/blog")
            }
            setImageUrl(data.url);
        } else {
            alert("Upload faild: " + data.error)
        }
    };

    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1 pt-15 overflow-hidden">

                <div className={`flex-1 flex flex-col transition-all duration-300 bg-gray-200 `}>

                    <div className="flex-1 overflow-auto py-6 px-2 mb-12">

                        {/* Back Button */}
                        <button onClick={() => router.back()} className="flex font-bold text-black bg-white items-center justify-end gap-2 rounded-md mb-5 mx-4 px-4 py-2 hover:bg-blue-600 hover:text-white pl-auto "><ArrowLeft size={30} /><span>Back to Post</span></button>


                        <div className="flex flex-col bg-white shadow-lg rounded-2xl mx-auto">

                            <h1 className="flex text-2xl border rounded-t-2xl font-bold bg-blue-600 text-white mb-6 border-b-2 p-6">Post Add Form</h1>

                            {role === 'admin' &&
                                <form onSubmit={handleSubmit} className="w-full space-y-4 text-black px-6 pb-6">

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">Title:</label>
                                            <input
                                                type="text"
                                                id="title"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("title", e.target.value)
                                                }} />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Slug:</label>
                                            <input
                                                type="text"
                                                id="slug"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("slug", e.target.value)
                                                }} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">Content:</label>

                                            {/* <MDEditor
                                                id="content"
                                                value={postData.content}
                                                onChange={(e) =>
                                                    handleChangeBlog("content", e as string)
                                                }
                                                height={300}

                                            /> */}
                                            <MDEditor value={markdown} onChange={setMarkdown} />
                                            {/* <RichTextEditor content={postData.content}/> */}
                                            
                                        </div>
                                        <div>
                                            <label className="font-semibold">Excerpt:</label>
                                            <input
                                                type="text"
                                                id="excerpt"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("excerpt", e.target.value)
                                                }} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">PublishAt:</label>
                                            <input
                                                type="date"
                                                id="publishAt"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("publishAt", e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Category:</label>
                                            <select
                                                id="category"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("category", e.target.value)
                                                }}
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
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("userId", e.target.value)
                                                }}
                                            >
                                                <option value=""> Select Category Name</option>
                                                {username.map((sc) => (
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
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>


                                    {/* Submit Button */}
                                    <div className="gap-4 flex justify-end">
                                        <Link href="/post" className=" bg-white border font-bold text-black py-2 px-2 rounded transition ml-2">
                                            Cancel
                                        </Link>
                                        <button type="submit" className=" bg-white border text-black py-2 px-2 rounded font-bold transition mr-2">
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
                                                onChange={(e) => {
                                                    handleChangeBlog("title", e.target.value)
                                                }} />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Slug:</label>
                                            <input
                                                type="text"
                                                id="slug"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("slug", e.target.value)
                                                }} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">Content:</label>
                                            <input
                                                type="text"
                                                id="content"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("content", e.target.value)
                                                }} />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Excerpt:</label>
                                            <input
                                                type="text"
                                                id="excerpt"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("excerpt", e.target.value)
                                                }} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold">PublishAt:</label>
                                            <input
                                                type="date"
                                                id="publishAt"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("publishAt", e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="font-semibold">Category:</label>
                                            <select
                                                id="category"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("category", e.target.value)
                                                }}
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
                                            <label className="font-semibold">Username:</label>
                                            <select
                                                id="userId"
                                                className="w-full border p-2 rounded"
                                                onChange={(e) => {
                                                    handleChangeBlog("userId", e.target.value)
                                                }}
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
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="gap-4 flex justify-end">
                                        <Link href="/post" className=" bg-white border font-bold text-black py-2 px-2 rounded transition ml-2">
                                            Cancel
                                        </Link>
                                        <button type="submit" className=" bg-white border text-black py-2 px-2 rounded font-bold transition mr-2">
                                            Create Post
                                        </button>
                                    </div>
                                </form>
                            }

                            {success && <p className="text-green-600 mt-4 font-semibold">Form submitted successfully ✅</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
