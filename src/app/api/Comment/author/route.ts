import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import { Blog, Comment, User } from "../../../../../model";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");
        // console.log({ name });
        const user = await User.findOne({ username: username })
        const blog = await Blog.find({ userId: user._id });
 
        console.log({blog})
        const ids = blog.map((bl: any) => bl._id.toString());
        console.log({ids});
        const details = await Comment.find({ blogId: { $in: ids } }).populate('userId', 'username').populate('blogId', 'title');
        console.log("000000000000000000000", details)
        return NextResponse.json({
            success: true,
            data: details,
            message: "Comment List Fetch Successfully..."
        });
    } catch (error) {
        console.log({ error })
        return NextResponse.json({
            error: "Failed to Fetch Comment List..."
        }, {
            status: 500
        })
    }
}