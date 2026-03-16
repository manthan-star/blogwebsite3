import Image from "next/image";
import { Navbar } from "@/component/layout/Navbar";
import { connectDB } from "../../../../../lib/mongodb";
import { Blog, Comment } from "../../../../../model";
import BlogComments from "@/component/BlogComment";
import { Calendar } from "lucide-react";
import Footer from "@/component/layout/Footer";
// import CommentShow from "@/component/ShowComment";

interface PageProps {
    params: Promise<{ category: string; slug: string, }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
    // ⭐ MUST unwrap params
    const { category, slug, } = await params;

    await connectDB();

    const blog = await Blog.findOne({ slug }).populate("category");


    if (!blog) {
        return <div className="p-8 text-center text-xl">Blog not found</div>;
    }

    return (
        <>
            <Navbar />

            <div className="pt-28 mx-auto px-40 pb-28 bg-blue-100/60">
                {/* <h1 className="text-3xl font-bold mb-4 text-white">{category}</h1> */}

                {/* <div className="grid grid-cols-2 gap-10"> */}
                <div className="mx-30 bg-white">
                    <div className="flex items-center justify-center">
                        <Image
                            src={`/postImage/${blog.image}`}
                            alt={blog.title}
                            width={900}
                            height={500}
                            className="rounded-md w-full h- mb-6"
                        />
                    </div>
                    <div className="pb-15 mx-5">
                        <div className="grid grid-cols-2 mb-4 border-">
                            <div>
                                <h1 className="text-2xl text-black font-bold">{blog.title}</h1>
                            </div>
                            <div>
                                <h1 className="flex text-gray-700 justify-end items-center text-[9px]"><Calendar className="p-2 text-sm" />{blog.publishAt.toDateString()}</h1>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                        <h1 className="text-black text-[10px]"> Category: {blog.category.category}</h1>
                        <h1 className="text-black text-[10px]"> BlogPost: {blog?.userId?.username}</h1>
                        <hr className="my-10 border-zinc-800" />

                    </div>
                </div>
                        <BlogComments
                            blogId={blog._id}
                            userId={blog.username}
                        // comments = {}
                        />
            </div>
            {/* </div> */}
            <Footer />

        </>
    );
}