"use client"
import { User } from "../../../model";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/component/layout/Navbar";

interface CategoryInfo {
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

export default function AdminPage() {
    const [blog, setBlog] = useState<Blog[]>([]);
    const [current, setCurrent] = useState(1);

    const PagePre = 9;

    const total = Math.ceil(blog.length / PagePre);

    const setIndex = (current - 1) * PagePre;
    const currentBlog = blog.slice(setIndex, setIndex + PagePre);

    console.log("----------------------", currentBlog);

    useEffect(() => {
        getDropDownlist();
    }, []);

    const getDropDownlist = async () => {
        const respo = await fetch("/api/Blog")
        // console.log("dad", respo.json);
        const data = await respo.json();
        console.log('............................', data.data)
        setBlog(data.data)
    }

    return (
        <div className="">
            <Navbar />
            <div className="bg-white">
                <div className="bg-white grid grid-cols-3 pt-30 gap-3 min-h-screen mx-20">
                    {currentBlog.map((img) => (
                        <div key={img.image} className="">
                            <div className="border border-black rounded-md">
                                <Link href={`/blog`}>
                                    <Image src={`/postImage/${img.image}`}
                                        className="border border-black w-full h-80 rounded-t-md"
                                        width={200}
                                        height={100}
                                        alt={`${img.image}`} /></Link>
                                <h1 className="text-xl text-black px-2">{img.title}</h1>
                            </div>
                        </div>
                    ))}
                </div>
                {total > 1 && (
                    <div className="flex justify-center gap-3 pb-30 my-8">
                        <button
                            disabled={current === 1}
                            onClick={() => setCurrent((p) => p - 1)}
                            className="px-4 py-2 border text-black rounded"
                        >
                            Prev
                        </button>

                        {[...Array(total)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i + 1)}
                                className={`px-4 py-2 text-black border rounded ${current === i + 1
                                    ? "bg-black text-white"
                                    : "bg-white text-black"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={current === total}
                            onClick={() => setCurrent((p) => p + 1)}
                            className="px-4 py-2 border text-black rounded"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}