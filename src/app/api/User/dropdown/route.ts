import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import { User } from "../../../../../model";

export async function GET( ){
     try {
        await connectDB();
        
        const users = await User.find().select('username');
        return NextResponse.json({success: true, data: users}, {status:200})
    }catch(error) {
        return NextResponse.json({success: true, error: "Not Data"}, {status:500})
    }
}