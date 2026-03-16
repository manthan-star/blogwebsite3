import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import { Blog } from "../../../../../model";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    try {
        const { id } = await params;
        await connectDB();

        const post = await Blog.findById(id);

        return NextResponse.json({
            success: true,
            data: post
        }, { status: 200 })
    } catch (error: any) {
        console.log("Please solve this error: ", error);

        return NextResponse.json({
            success: false,
            data: error.message 
        }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params : Promise<{ id: string }>}) {
    try {
        const { id } = await params;
        await connectDB();

        const { userId, title, slug, content, excerpt, publishAt, category, image, url } = await request.json();

        const post = await Blog.findByIdAndUpdate(
            id,
            { userId, title, slug, content, excerpt, publishAt, category, image, url },
            { new: true }
        )

        return NextResponse.json({
            success: true,
            data: post
        }, { status: 200 });

    } catch (error: any) {
        console.log("Please Solve this error: ", error);

        return NextResponse.json({
            success: false,
            data: error.message,
        }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();

        const deleted = await Blog.findByIdAndDelete(id);

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