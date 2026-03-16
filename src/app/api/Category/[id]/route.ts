import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import { Blog, Category } from "../../../../../model";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await connectDB();

        const data = await Category.findById(id).populate('mainId', 'category');

        return NextResponse.json({
            success: true,
            data: data,
        }, { status: 200 });

    } catch (error: any) {
        console.log("Slove this Error: ", error);

        return NextResponse.json({
            success: false,
            data: error.message,
        }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const { category, description, mainId } = await request.json();

        const updated = await Category.findByIdAndUpdate(
            id,
            { category, description, mainId },
            { new: true });
        
        return NextResponse.json({
            success: true,
            data: updated
        }, { status: 200 });

    } catch (error: any) {
        console.log("Please Error Solve: ", error);

        return NextResponse.json({
            success: false,
            data: error.message,
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await connectDB();
        const deleted = await Category.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "Category deleted successfully"
        }, { status: 200 });

    } catch (error: any) {
        console.log("Please Solve this error", error);

        return NextResponse.json({
            success: false,
            data: error.message,
        }, { status: 500 })
    }
}