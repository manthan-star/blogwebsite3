"use client";

import { Navbar } from "@/component/layout/Navbar";
import { ConfirmModal } from "@/component/ui/confirm";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInfo {
    _id: string;
    username: string;
}

interface BlogInfo {
    _id: string;
    title: string;
}

interface Comment {
    _id: string;
    comment: string;
    userId: UserInfo;
    blogId: BlogInfo;
    status: "pending" | "approve" | "reject";
}

export default function CommentPage() {
    const router = useRouter();

    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState<Comment[]>([]);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
    const [role, setRole] = useState("");
    
        useEffect(() => {
            const role = sessionStorage.getItem("role")
            // const username = sessionStorage.getItem("username")
            console.log('...............', role)
            setRole(role || "");
            // setUsernames(username || "");
        }, []);

    useEffect(() => {
        getData();
    }, []);

    // 🔹 Fetch comments
    const getData = async () => {
        try {
            const res = await fetch("/api/Comment");
            const data = await res.json();
            setComments(data.data || []);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        getDatas();
    }, []);

    // 🔹 Fetch comments
    const getDatas = async () => {
        try {
            const username = window.sessionStorage.getItem('username')
            const res = await fetch(`/api/Comment/author?username=${username}`);
            const data = await res.json();
            console.log("-------------",data)
            setComment(data.data || []);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    // 🔹 Approve / Reject
    const handleApproval = async (id: string, action: 'approve' | 'reject') => {
        try {
            const res = await fetch(`/api/Comment/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action }),
            });

            if (!res.ok) {
                throw new Error("Failed to update status");
            }

            getData();
        } catch (error) {
            console.error("Approval error:", error);
        }
    };

    // 🔹 Delete comment
    const handleDelete = async () => {
        if (!selectedComment) return;

        try {
            const res = await fetch(`/api/Comment/${selectedComment._id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                getData();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }

        setDeleteConfirmOpen(false);
        setSelectedComment(null);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex flex-1 pt-15 overflow-hidden">
                <div className="flex-1 flex flex-col transition-all duration-300 bg-gray-200">
                    {/* HEADER */}
                    <div className="sticky flex mx-4">
                        <button onClick={() => router.back()} className="bg-white text-black font-bold rounded-full p-1 my-7 hover:bg-blue-600 hover:text-white"><ArrowLeft size={30} /></button>

                        <h1 className="flex flex-col text-[24px] font-semibold justify-center items-center m-auto text-black border-b-4">
                            Comment Details
                        </h1>

                        <button
                            className="flex font-bold text-black items-center gap-2 rounded-md px-4 my-7 mx-4 hover:bg-blue-600 hover:text-white pl-auto bg-white"
                            onClick={() => router.push("/comment/add")}
                        >
                            <Plus />
                            Add Comment
                        </button>
                    </div>

                    {/* TABLE */}
                    <div className="flex-1 overflow-y-scroll max-h-127.5 mx-3 border border-gray-200 bg-white rounded-md text-black">
                        <table className="border-collapse w-full border-b-2 bg-white border-gray-300">
                            <thead className="sticky top-0 bg-gray-50 z-10 border-b-2 border-gray-300">
                                <tr>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Sr.No</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Comment</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Blog</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">User</th>
                                    <th className="p-2 border-r-2 w-auto border-gray-300">Status</th>
                                    <th className="p-2 w-auto border-gray-300">Action</th>
                                </tr>
                            </thead>

                            {role === 'admin' &&
                                <tbody>
                                    {comments.map((dir, i) => (
                                        <tr key={i}>
                                            <td className="p-2 text-center border-r-2 border-gray-300">{i + 1}</td>
                                            <td className="p-2 text-center border-r-2 border-gray-300">{dir.comment}</td>
                                            <td className="p-2 text-center border-r-2 border-gray-300">
                                                {dir.blogId?.title}
                                            </td>
                                            <td className="p-2 text-center border-r-2 border-gray-300 ">
                                                {dir.userId?.username}
                                            </td>

                                            {/* STATUS */}
                                            <td className="py-2 my-2 flex justify-center items-center">
                                                <span
                                                    className={`px-2 py-1 rounded text-white text-sm ${dir.status === "approve"
                                                        ? "bg-green-600"
                                                        : dir.status === "reject"
                                                            ? "bg-red-600"
                                                            : "bg-yellow-500"
                                                        }`}
                                                >
                                                    {dir.status}
                                                </span>
                                            </td>

                                            {/* ACTION */}
                                            <td className="border-l-2 border-gray-300">
                                                <div className="flex justify-center gap-5">
                                                    <button
                                                        className="text-green-600 font-bold disabled:opacity-50"
                                                        disabled={dir.status === "approve"}
                                                        onClick={() =>
                                                            handleApproval(dir._id, "approve")
                                                        }
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        className="text-red-600 font-bold disabled:opacity-50"
                                                        disabled={dir.status === "reject"}
                                                        onClick={() =>
                                                            handleApproval(dir._id, "reject")
                                                        }
                                                    >
                                                        Reject
                                                    </button>

                                                    <button
                                                        className="text-black font-bold"
                                                        onClick={() => {
                                                            setSelectedComment(dir);
                                                            setDeleteConfirmOpen(true);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            }
                            {role === 'author' &&
                                <tbody>
                                    {comment.map((dir, i) => (
                                        <tr key={i}>
                                            <td className="p-2 text-center border-r-2 border-gray-300">{i + 1}</td>
                                            <td className="p-2 text-center border-r-2 border-gray-300">{dir.comment}</td>
                                            <td className="p-2 text-center border-r-2 border-gray-300">
                                                {dir.blogId?.title}
                                            </td>
                                            <td className="p-2 text-center border-r-2 border-gray-300 ">
                                                {dir.userId?.username}
                                            </td>

                                            {/* STATUS */}
                                            <td className="py-2 my-2 flex justify-center items-center">
                                                <span
                                                    className={`px-2 py-1 rounded text-white text-sm ${dir.status === "approve"
                                                        ? "bg-green-600"
                                                        : dir.status === "reject"
                                                            ? "bg-red-600"
                                                            : "bg-yellow-500"
                                                        }`}
                                                >
                                                    {dir.status}
                                                </span>
                                            </td>

                                            {/* ACTION */}
                                            <td className="border-l-2 border-gray-300">
                                                <div className="flex justify-center gap-5">
                                                    <button
                                                        className="text-green-600 font-bold disabled:opacity-50"
                                                        disabled={dir.status === "approve"}
                                                        onClick={() =>
                                                            handleApproval(dir._id, "approve")
                                                        }
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        className="text-red-600 font-bold disabled:opacity-50"
                                                        disabled={dir.status === "reject"}
                                                        onClick={() =>
                                                            handleApproval(dir._id, "reject")
                                                        }
                                                    >
                                                        Reject
                                                    </button>

                                                    <button
                                                        className="text-black font-bold"
                                                        onClick={() => {
                                                            setSelectedComment(dir);
                                                            setDeleteConfirmOpen(true);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>

            {/* CONFIRM MODAL */}
            <ConfirmModal
                id="delete_model"
                open={deleteConfirmOpen}
                title="Delete Comment"
                message={`Are you sure you want to delete "${selectedComment?.comment}"?`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteConfirmOpen(false)}
                confirmText="Confirm"
                cancelText="Cancel"
            />
        </div>
    );
}
