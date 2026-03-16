// "use client";

// import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/component/layout/Navbar";
import Image from "next/image";
// import { useParams } from "next/navigation";;
import { dataApi } from "./data";
import { Blog } from "../../../../model";
import { connectDB } from "../../../../lib/mongodb";
import Footer from "@/component/layout/Footer";
import { Calendar } from "lucide-react";

interface CategoryDetailProps {
    params: Promise<{ category: string }>;
}

interface Blog {
    _id: string;
    title: string;
    category: string;
    excerpt: string;
    image: string;
};

export async function generateStaticParams() {
    await connectDB();

    const blog: any = await Blog.find().populate('category', 'category');
    const validation = blog.filter((blogs: any) => typeof blogs.category === 'string' && blogs.category.trim().length > 0);
    return validation.map((blog: any) => ({
        category: blog.category
    }));
}

export async function generateMetadata({ params }: CategoryDetailProps) {
    const { category } = await params;
    const categorys = dataApi(category);
    if (!categorys) {
        return {
            title: 'Blog not found Not Found',
        };
    }
}

export default async function CategoryDetailPage({ params }: CategoryDetailProps) {
    const { category } = await params;

    const currentCategory = Number(category);
    const categoryNumber = 9;
    let categorys;

    categorys = await dataApi(category, );
    console.log({categorys})


    if (!categorys) {
        // notFound();
    }


    return (
        <div className="">
            <Navbar />

            <div className="bg-blue-100/60 pt-20 min-h-screen">
                <div className=" px-15">
                    <h1 className="text-2xl text-black font-bold mb-6"></h1>

                    <div className="grid grid-cols-3 pb-10 gap-6">
                        {categorys.map((blog: any, i: any) => (
                            <div key={i} className="rounded-md bg-white">
                                <div>
                                    <Image className="w-full h-50 rounded-t-md" src={`/postImage/${blog.image}`} alt={`${blog.image}`} width={200} height={100} />
                                </div>
                                <div className="p-4">
                                    <h1 className="text-black text-xl pb-2 font-bold">{blog.title}</h1>
                                    <p className="text-black pb-2">
                                        {blog.content}
                                    </p>
                                    <h1 className="text-sm text-black pr-0 flex-row flex items-center mb-4"><Calendar className="py-1"/>{blog.publishAt.toDateString()}</h1>
                                    
                                    <Link href={`/dashboard/${category}/${blog.slug}`} className="text-sm border py-2 px-1 font-bold rounded-md text-gray-600 hover:text-blue-800">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {/* <div className="flex justify-center items-center space-x-2 pb-10">
                        {currentPage > 1 && (
                            <Link href={`/dashboard/${category}?page=${currentPage - 1}`} className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Previous
                            </Link>
                        )}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Link
                                key={p}
                                href={`/dashboard/${category}?page=${p}`}
                                className={`px-3 py-2 rounded ${p === currentPage ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {p}
                            </Link>
                        ))}
                        {currentPage < totalPages && (
                            <Link href={`/dashboard/${category}?page=${currentPage + 1}`} className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Next
                            </Link>
                        )}
                    </div> */}
                </div>
            </div>
            <Footer />
        </div>
    );
}

