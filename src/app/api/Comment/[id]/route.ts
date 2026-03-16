import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import { Blog, Comment } from "../../../../../model";

export async function GET(request: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {
    try {
        const { blogId } = await params;
        await connectDB();
        // const cost = await request.json({blogId})
        const comments = await Comment.find({ status: 'approve' }).sort({ createdAt: -1 });

        console.log("00000000000000000000", comments);

        return NextResponse.json({ success: true, data: comments }, { status: 200 });

    } catch (error: any) {
        console.log("Please solve this Error: ", error);

        return NextResponse.json({
            success: false,
            data: error.message
        }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const { id } = await params;

        // Frontend sends { action: "approve" } or { action: "reject" }
        const { action } = await request.json();

        // Convert action to status
        let status: "approve" | "reject";
        if (action === "approve") status = "approve";
        else if (action === "reject") status = "reject";
        else {
            return NextResponse.json(
                { success: false, message: "Invalid action" },
                { status: 400 }
            );
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { status },
            { new: true } // return updated document
        );

        if (!updatedComment) {
            return NextResponse.json(
                { success: false, message: "Comment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: updatedComment },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("PUT Comment Error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();

        const deleted = await Comment.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "Successfully Delete"
        }, { status: 200 });

    } catch (error: any) {
        console.log("Please Solve this error:", error);

        return NextResponse.json({
            success: false,
            data: error.message
        }, { status: 500 });
    }
}