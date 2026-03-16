import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Category from "../../../../../model/Category";

export async function GET( ){
     try {
        await connectDB();
        
        const category = await Category.find().select('category');
        return NextResponse.json({success: true, data: category}, {status:200})
    }catch(error) {
        return NextResponse.json({success: true, error: "Not Data"}, {status:500})
    }
}