import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Blog from "../../../../model/Blog";
import { Category } from "../../../../model";
import { pagenation } from "@/lib/pagenation";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        await connectDB()
        const baseQuery = await pagenation(searchParams);
        const post = await Blog.find({}, {}, baseQuery).populate('category', 'category').populate('userId', 'username');

        console.log("Find Data for Post: ", post);

        return NextResponse.json({
            success: true,
            data: post
        }, { status: 200 });

    } catch (error: any) {
        console.log("Find Error: ", error);

        return NextResponse.json({
            success: false,
            data: error.message
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { userId, title, slug, content, excerpt, publishAt, category, image, url } = body;

        const post = new Blog({ userId, title, slug, content, excerpt, publishAt, category, image, url });

        await post.save();

        return NextResponse.json({
            success: true,
            data: post
        }, { status: 200 })

    } catch (error: any) {
        console.log("Find Error: ", error);

        return NextResponse.json({
            success: false,
            data: error.message
        }, { status: 500 })
    }
}