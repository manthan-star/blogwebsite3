import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import { User } from "../../../../../model";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();

        const user = await User.findById(id);

        return NextResponse.json({
            success: true,
            data: user
        }, { status: 200 });

    } catch (error: any) {
        console.log("Please Solve this Error: ", error);

        return NextResponse.json({
            success: false,
            data: error.message
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();

        const { username, birth, age, gender, email, city, phone, password, role, image, url } = await request.json();

        const updated = await User.findByIdAndUpdate(
            id,
            { username, birth, age, gender, email, city, phone, password, role, image, url },
            { new: true });

        return NextResponse.json({
            success: true,
            data: updated
        }, { status: 200 });

    } catch (error: any) {
        console.log("Please Slove this error: ", error);

        return NextResponse.json({
            success: false,
            data: error.message
        }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();

        const deleted = await User.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "User deleted successfully"
        }, { status: 200 });

    } catch (error: any) {
        console.log("Please solve this error: ", error);

        return NextResponse.json({
            success: false,
            data: error.message
        }, { status: 500 });
    }
}