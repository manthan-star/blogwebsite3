import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "../../../../../../lib/mongodb";
import { Comment } from "../../../../../../model";
 
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  await connectDB();
 
  const { blogId } = await params;
//   const blogObjectId = new mongoose.Types.ObjectId(blogId);
  const comments = await Comment.find({
    blogId: blogId,
    // userId,
    // userId: userId;
    status: "approve",
  }).sort({ createdAt: -1 }).populate("blogId", "title").populate("userId", "username");
 
  return NextResponse.json({ success: true, data: comments });
}