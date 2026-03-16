import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../model/User";


export async function GET() {
    try {
        await connectDB();

        const user = await User.find();

        console.log("Students fetched successfully:", user);

        return NextResponse.json({ success: true, data: user }, { status: 200 });

    } catch (error: any) {

        console.error("Error fetching students:", error);

        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { username, birth, age, gender, email, city, phone, password, role, image, url } = body;

        const newuser = new User({ username, birth, age, gender, email, city, phone, password, role, image, url });

        await newuser.save();

         return NextResponse.json({ success: true, message: "Post added successfully", data: newuser },
            { status: 200 });

    } catch (error: any) {
        console.log("Error is Post Side", error);

        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
