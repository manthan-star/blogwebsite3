import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import { Category } from "../../../../model";

export async function GET() {
    try {
        await connectDB();

        const mainCategory = await Category.find({ mainId: null});

        return NextResponse.json({
            success: true,
            data: mainCategory,
        }, { status: 200 })
    } catch (error: any) {

        console.log("Error Find: ", error);
        return NextResponse.json({
            success: false,
            data: error.message,
        })
    }
}