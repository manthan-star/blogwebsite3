"use client"
import { useEffect, useState } from "react"

interface UserInfo {
    _id: string;
    username: string;
}

interface BlogInfo {
    _id: string;
    title: string;
    slug: string;
}

interface Comment {
    _id: string;
    comment: string;
    userId: UserInfo;
    blogId: BlogInfo;
    status: "pending" | "approve" | "reject";
}

export default function CommentShow({ id }: { id: string }) {
    const [comment, setComment] = useState<Comment[]>([]);
    const [blog, setBlog] = useState<BlogInfo[]>([]);

    useEffect(() => {
        
           
             getData();
         

    }, []);

    const getData = async (id: string) => {
        const respo = await fetch(`/api/Comment/${id}`)
        const data = await respo.json();
        console.log('.................', data.data);
        setComment(data.data)
    }
    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = async () => {
        const respo = await fetch("/api/Blog")
        const data = await respo.json();
        console.log('.................', data.data);
        setBlog(data.data)
    }

    return (
        <>
            <div>
                {/* {blog?.map((cat: any) => (
                    <div key={cat.slug} className="text-white"> */}
                        {comment.map((cate) => (
                            <div key={cate.blogId.title} className="grid grid-cols-3 gap-2">
                                <div>
                                    {cate.userId?.username}<br />
                                    {cate.comment}
                                </div>
                            </div>
                        ))}
                    {/* </div>
                ))} */}
            </div>
        </>
    )
}