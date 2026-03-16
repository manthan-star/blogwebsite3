"use client"

import { Navbar } from "@/component/layout/Navbar";
import { ArrowLeft, WashingMachine } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
    _id: string;
    category: string;
    description: string;
    mainId: string | { _id: string; category: string };
}


export default function CategoryEdit() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [open, setOpen] = useState(true);
    const [formData, setFormData] = useState({
        category:"",
        description: "",
        mainId: "",
    });

    useEffect(() => {
        if (id) {
            fetchCategory();
            fetchmainId();
        }
    }, [id]);

    const fetchCategory = async () => {
        try {
            const response = await fetch(`/api/Category/${id}`);
            const data = await response.json();

            if (data.success && data.data) {
                const cat = data.data;
                // setCategoryData(cat);

                const mainId = typeof cat.mainId === 'object' && cat.mainId?._id
                    ? cat.mainId._id
                    : typeof cat.mainId === 'string'
                        ? cat.mainId
                        : '';                        

                setFormData({
                    category: cat.category,
                    description: cat.description || "",
                    mainId: mainId,
                    
                });
            }
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    };
    

    const fetchmainId = async () => {
        try {
            const res = await fetch('/api/Category?dropdown');
            const data = await res.json();
            if (data.success && data.data) {
                setCategoryData(data.data);
            }
        } catch (error) {
            console.error("Error fetching Category:", error);
        }
    };

    // console.log('---------------', fetchmainId)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            category: formData.category,
            description: formData.description,
            mainId: formData.mainId,
        };
        console.log(data);

        const res = await fetch(`/api/Category/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            
            alert("Category updated successfully");
            // router.push("/category");
        } else {
            alert("Failed to update category");
        }
    }


    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <div className="flex flex-1 pt-15 overflow-hidden">

                <div className={`flex-1 flex flex-col transition-all duration-300 bg-gray-200`}>

                    <div className="flex-1 overflow-auto px-2 py-6 mb-12">

                        {/* Back Button */}
                        <button onClick={() => router.back()} className="flex font-bold text-black items-center justify-end gap-2 rounded-md mb-5 mx-4 px-4 py-2 pl-auto bg-white "><ArrowLeft size={30} /><span>Back to Category</span></button>

                        <div className="flex flex-col bg-white shadow-lg rounded-xl mx-auto">

                            <h1 className="flex text-2xl border rounded-t-2xl font-bold bg-blue-600 text-white mb-6 border-b-2 p-6">Category Edit Form</h1>
                            <form onSubmit={handleSubmit} className="w-full space-y-4 px-6 pb-6 text-black">
                                {/* Room Name */}
                                <div>
                                    <label className="font-semibold">Category:</label>
                                    <input
                                        type="text"
                                        id="category"
                                        value={formData.category}
                                        name="category"
                                        className="w-full border p-2 rounded"
                                        onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="font-semibold">Description:</label>
                                    <input
                                        id="description"
                                        value={formData.description}
                                        name="description"
                                        className="w-full border p-2 rounded"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold">mainId:</label>
                                    <select
                                        id="mainId"
                                        value={formData.mainId}
                                        name="mainId"
                                        className="w-full border p-2 rounded"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select mainId</option>
                                        {categoryData?.map((sc: any) => (
                                            <option key={sc._id} value={sc._id}>
                                                {sc.category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Update & Cancel Button */}
                                <div className="gap-4 flex justify-end">
                                    <Link href="/dashboard/room" className=" bg-white border font-bold text-black py-2 px-2 rounded transition ml-2">
                                        Cancel
                                    </Link>
                                    <button type="submit" className="border bg-white text-black py-2 px-2 rounded font-bold transition mr-2">
                                        Update Category
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