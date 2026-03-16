"use client"

import { Navbar } from "@/component/layout/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CategoryInfo {
    _id: string;
    mainId: string;
    category: string;
}

export default function CategoryAdd() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [category, setCategory] = useState<CategoryInfo[]>([]);
    const [open, setOpen] = useState(true);
    const [catData, setFormData] = useState({
        category: "",
        description: "",
        mainId: "",
    });
    const [success, setSuccess] = useState<boolean>(false);


    useEffect(() => {
        getDropdownlist();
    }, []);

    const getDropdownlist = async () => {
        const respo = await fetch("/api/Category/dropdown")
        // console.log("dad", respo.json);
        const data = await respo.json();
        console.log('............................',data.data)
        setCategory(data.data)
    }

    const handleChangeCategory = (field: string, value: string) => {
        setFormData((prev) =>
            ({ ...prev, [field]: value }));
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();



        const resp = await fetch('/api/Category', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: catData.category,
                description: catData.description,
                mainId: catData.mainId,
            }),
        })
        console.log(resp)
        if (resp.ok) {
            setSuccess(true)
            router.push("/category")
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
                            <ArrowLeft size={30} /><span>Back to Category</span></button>


                        <div className="flex flex-col bg-white shadow-lg rounded-2xl mx-auto">

                            <h1 className="flex text-2xl border rounded-t-2xl font-bold bg-blue-600 text-white mb-6 border-b-2 p-6">Category Add Form</h1>

                            <form onSubmit={handleSubmit} className="w-full text-black space-y-4 px-6 pb-6">

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-semibold">Category:</label>
                                        <input
                                            type="text"
                                            id="category"
                                            className="w-full border p-2 rounded"
                                            onChange={(e) => {
                                                handleChangeCategory("category", e.target.value)
                                            }} />
                                    </div>
                                    <div>
                                        <label className="font-semibold">Description:</label>
                                        <input
                                            type="text"
                                            id="description"
                                            className="w-full border p-2 rounded"
                                            onChange={(e) => {
                                                handleChangeCategory("description", e.target.value)
                                            }} />
                                    </div>
                                </div>                              
                                
                                <div className="grid grid-cols-2 gap-4">

                                    
                                    <div>
                                        <label htmlFor="subjectId" className="font-semibold">Main Category:</label>
                                        <select
                                            id="mainId"
                                            className="w-full border p-2 rounded text-black"
                                            onChange={(e) => {
                                                handleChangeCategory("mainId", e.target.value)
                                            }}
                                        >
                                            <option value="" className="text-black"> Select MainId</option>
                                            {category.map((cate) => (
                                                <option key={cate._id} value={cate._id}>
                                                    {cate.category}
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
                                    <button type="submit" className=" bg-white text-black py-2 px-2 border rounded font-bold transition mr-2 ">
                                        Create Category
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
