// "use client";

// import { useState, useEffect } from "react";

// interface BlogInfo {
//   _id: string;
//   title: string;
//   slug: string;
// }
// interface CommentType {
//   _id: string;
//   blogId: BlogInfo;
//   slug: string;
//   username: string;
//   comment: string;
//   createdAt: string;
// }

// export default function BlogComments({ blogId }: { blogId: string; userId: string }) {
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState<CommentType[]>([]);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     // ⭐ get username from sessionStorage
//     const user = window.sessionStorage.getItem("username") || "";
//     setUsername(user);

//     fetchComments(blogId);
//   }, []);

//   const fetchComments = async (blogId: string) => {
//     const res = await fetch(`/api/Comment/${blogId}`);
//     const data = await res.json();
//     if (data.success) setComments(data.data);
//     console.log("000000000000000000000000", data);
//   };

// //   const usreId = username

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!comment) return alert("Please write something");

//     const res = await fetch("/api/Comment", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, blogId, comment }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       setComment("");
//       fetchComments(blogId);
//       alert("Comment submitted! Pending approval.");
//     } else {
//       alert("Failed to submit comment");
//     }
//   };

//   return (
//     <div className="mt-12">
//       <h2 className="text-xl font-bold mb-4">Comments</h2>

//       <form onSubmit={handleSubmit} className="mb-6">
//         <textarea
//           className="w-full border p-2 rounded mb-2"
//           placeholder="Write your comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-black border text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>

//       <div>
//         {comments.map((c) => (
//           <div key={c._id} className="border-b py-2">
//             <p className="font-semibold">{c.username}</p>
//             <p>{c.comment}</p>
//             <p className="text-gray-400 text-sm">
//               {new Date(c.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function BlogComments({ blogId }: any) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // ⭐ get username from sessionStorage
    const user = window.sessionStorage.getItem("username") || "";
    setUsername(user);

    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch(`/api/Comment/blog/${blogId}`);
    const data = await res.json();
    setComments(data.data);
  };


  const submit = async () => {
    await fetch("/api/Comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, blogId, comment }),
    });
    setComment("");
    alert("Comment submitted for approval");
  };

  return (
    <>
      <div>
        <h1 className="mb-5 text-xl text-black">Leave a Comment</h1>
        <textarea
          placeholder="Write your comment..."
          className="border py-1 px-2 rounded-md w-full text-black mb-5 placeholder:text-sm placeholder-black"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={submit} className="border text-black text-sm p-2 rounded-md mb-5">Submit Comment</button>
      </div>
      <h1 className="text-xl mb-4 text-black">All Comments: ({comments.length})</h1>
      <div className=" ">
        {comments.map((c) => (
          <div key={c._id} className="flex p-3 border border-black rounded-md items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border text-blue-950 flex items-center justify-center font-bold uppercase">
                {c.userId.username.charAt(0) || "U"}
              </div>

              <div className="text-sm text-black">
                <p className="font-semibold text-black capitalize">
                  {c.userId.username}
                </p>
                <p className="text-[8px] text-black">
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-black text-sm">
              {c.comment}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}