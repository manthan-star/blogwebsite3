"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, DeleteIcon, Edit2Icon, EditIcon, Plus, ViewIcon } from "lucide-react";
import { ConfirmModal } from "@/component/ui/confirm";
import { Navbar } from "@/component/layout/Navbar";


interface CategoryInfo{
    _id: string;
    category: string;
}

interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    publishAt: Date;
    category: CategoryInfo;
    image: string;
    url: string;
}

export default function UserPage() {
    const router = useRouter();
    const [blog, setPost] = useState<Blog[]>([]);
    const [] = useState<string>("");
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [open, setOpen] = useState(true)

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const respo = await fetch("/api/Blog")
        const data = await respo.json();
        console.log('.................', data.data);
        setPost(data.data)
    }

    const handleDelete = async () => {

        const resp = await fetch(`/api/Blog/${selectedBlog?._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })

        console.log({ resp })

        if (resp.ok) {
            getData()
        }
        setSelectedBlog(null);
        setDeleteConfirmOpen(false);
    }

    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1 pt-15 overflow-hidden">


                <div className={`flex-1 flex flex-col transition-all duration-300 bg-gray-200`}>


                    <div className="sticky flex mx-4">
                        <button onClick={() => router.back()} className="bg-black text-white font-bold rounded-full p-1 my-7 hover:bg-black"><ArrowLeft size={30} /></button>

                        <h1 className="flex flex-col text-[24px] font-semibold justify-center items-center m-auto text-black border-b-4">Post Details</h1>

                        <button
                            className="flex font-bold text-white items-center gap-2 rounded-md px-4 my-7 mx-4 hover:bg-black hover:text-white pl-auto bg-blue-600"
                            onClick={() => router.push("/blog/add")}>
                            <Plus />
                            <span>Add Post</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-scroll max-h-127.5 mx-3 border border-gray-200 bg-white rounded-md text-black">

                        <table className="border-collapse w-full border-b-2 bg-white border-gray-300">
                            <thead className="sticky top-0 bg-gray-50 z-10 border-b-2 border-gray-300">
                                <tr className="font-semibold">
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Sr.No</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Title</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Slug</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Content</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">PublishAt</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Category</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Image</th>
                                    <th className="p-2 w-50">Action</th>
                                </tr>
                            </thead>
                            <tbody className="font-semibold">

                                {blog.map((dir, i) => (
                                    <tr key={i}>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{i + 1}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.title}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.slug}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.content}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.publishAt?.toString()}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir?.category?.category}</td>
                                        <td className="py-2 my-2 flex justify-center items-center">
                                            <Image
                                            className=""
                                                src={`/postImage/${dir.image}`}
                                                width={50}
                                                height={54}
                                                alt={`${dir.image}`}
                                            /></td>
                                        <td className="border-l-2 border-gray-300">
                                            {/* button delete and edit */}
                                            <div className="flex justify-center gap-2">
                                                <Link
                                                    className="p-2 text-blue-500 font-bold  hover:"
                                                    href={`/${dir._id}`}
                                                >
                                                    View
                                                </Link>

                                                <Link className="p-2 text-green-600 font-bold  hover:" href={`/blog/${dir._id}`}>Edit</Link>

                                                <button className="p-2 text-red-600 font-bold  hover:"
                                                    onClick={() => {
                                                        setSelectedBlog(dir);
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
                message={`Are you sure you want to delete the user "${selectedBlog?.title}"?`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteConfirmOpen(false)}
                confirmText="Confirm"
                cancelText="Cancel"
            />
        </div>
    );
}