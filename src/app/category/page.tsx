"use client"

import { Navbar } from "@/component/layout/Navbar";
import { ConfirmModal } from "@/component/ui/confirm";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryInfo {
    _id: string;
    category: string;
    description: string;
    mainId: CategoryInfo;
}

export default function () {
    const router = useRouter();
    const [category, setCategory] = useState<CategoryInfo[]>([]);
    const [open, setOpen] = useState(true);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const respo = await fetch("/api/Category")
        const data = await respo.json();
        console.log(data.data);
        setCategory(data.data)
    }

    const handleDelete = async () => {

        const resp = await fetch(`/api/Category/${selectedCategory?._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        console.log('..............................', resp )

        if (resp.ok) {
            getData()
        }
        setSelectedCategory(null);
        setDeleteConfirmOpen(false);
    }

    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1 pt-15 overflow-hidden">

                <div className="flex-1 flex flex-col transition-all duration-300 bg-gray-200">


                    <div className="sticky flex mx-4">
                        <button onClick={() => router.back()} className="bg-white text-black font-bold rounded-full p-1 my-7 hover:bg-blue-600 hover:text-white"><ArrowLeft size={30} /></button>

                        <h1 className="flex flex-col text-[24px] text-black font-semibold justify-center items-center m-auto border-b-4">Category Details</h1>

                        <button
                            className="flex font-bold items-center gap-2 rounded-md px-4 my-7 hover:bg-blue-600 hover:text-white pl-auto bg-white text-black"
                            onClick={() => router.push("/category/add")}>
                            <Plus />
                            <span>Add Category</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-scroll max-h-127.5 mx-3 border border-gray-200 bg-white rounded-md text-black">
                        <table className="border-collapse w-full border-b-2 bg-white border-gray-300">
                            <thead className="sticky top-0 bg-gray-50 z-10 border-b-2 border-gray-300">
                                <tr className="font-semibold">
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Sr.No</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Category</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Description</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Main Id</th>
                                    <th className="p-2 w-50">Action</th>
                                </tr>
                            </thead>
                            <tbody className="font-semibold">

                                {category.map((dir, i) => (
                                    <tr key={i}>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{i + 1}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.category}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir.description}</td>
                                        <td className="p-2 text-center border-r-2 border-gray-300">{dir?.mainId?.category}</td>
                                        
                                        <td className="border-l-2 border-gray-300">
                                            <div className="flex justify-center gap-2">

                                                <Link className="p-2 text-green-600 font-bold  hover:"
                                                href={`/category/${dir._id}`}>Edit</Link>

                                                <button className="p-2 text-red-600 font-bold  hover:"
                                                    onClick={() => {
                                                        setSelectedCategory(dir);
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
                title="Delete Category"
                message={`Are you sure you want to delete the Category "${selectedCategory?.category}"?`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteConfirmOpen(false)}
                confirmText="Confirm"
                cancelText="Cancel"
            />
        </div>
    )
}
