import { NextRequest, NextResponse } from "next/server";
import { request } from "http";
import { User } from "../../../../model";
import { connectDB } from "../../../../lib/mongodb";

export async function POST(request: NextRequest) {
    await connectDB();

    const { email, password, role } = await request.json();

    // find email
    const user = await User.findOne({ email });

    console.log("----------------", user)

    if (!user) {
        return NextResponse.json(
            { error: "Email not registered" },
            { status: 400 }
        );
    }

    // password check
    if (user.password !== password) {
        return NextResponse.json(
            { error: "Wrong password" },
            { status: 401 }
        );
    }

    if (user.role !== role) {
        return NextResponse.json(
            { error: "Wrong role" },
            { status: 401 }
        );
    }

    return NextResponse.json(
        { success: true, data: user },
        { status: 200 }
    );
}
