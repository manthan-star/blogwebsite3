import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Category from "../../../../../model/Category";
import { Blog } from "../../../../../model";

export async function GET( ){
     try {
        await connectDB();
        
        const category = await Blog.find().select('title');
        return NextResponse.json({success: true, data: category}, {status:200})
    }catch(error) {
        return NextResponse.json({success: true, error: "Not Data"}, {status:500})
    }
}