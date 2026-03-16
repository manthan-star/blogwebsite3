import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Comment from "../../../../model/Comment";
import { User } from "../../../../model";
import { title } from "process";

export async function GET() {
    try {
        await connectDB();
        await User.init();
        const comments = await Comment.find({}).populate('blogId', 'title').populate('userId', 'username');

        console.log('.....................', comments);

        console.log("find Data: ", comments);

        return NextResponse.json({
            success: true,
            data: comments
        }, { status: 200 });

    } catch (error: any) {
        console.log("Error Find: ", error);

        return NextResponse.json({
            success: false,
            data: error.message,
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, blogId, comment, status } = body;

        console.log('..................', body);

        const userId = await User.findOne({username: username})

        const comments = new Comment({ userId : userId._id, blogId, comment, status: status ? status : 'pending' });
        console.log("0000000000000000000000000", comments)

        await comments.save();

        return NextResponse.json({
            success: true,
            data: comments,
        }, { status: 200 })

    } catch (error: any) {

        console.log("Error Find: ", error);

        return NextResponse.json({
            success: false,
            data: error.message,
        }, { status: 500 })
    }
}