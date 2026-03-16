import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Category from "../../../../model/Category";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const category = await Category.find().populate('mainId', 'category');

        console.log("Find Data for Category: ", category);

        return NextResponse.json({
            success: true,
            data: category
        }, { status: 200 });

    } catch (error: any) {
        console.log("Error Find: ", error);

        return NextResponse.json({
            success: false,
            data: error.message,
        }, { status: 500 })

    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { category, description, mainId } = body;
        if (!category || !description) {
            return NextResponse.json({
                message: "category and description are use full"
            })
        }

        let categoryData;
        if (mainId === undefined || mainId === null) {

            const parent = await Category.find({ mainId: null })

            if (parent.length > 3) {
                return NextResponse.json({
                    success: false,
                    message: 'You can not more than 3 main ID'
                }, { status: 406 })
            }
            categoryData = {
                category,
                description,
                mainId: null,
            }
        } else {
            categoryData = {
                category,
                description,
                mainId,
            }
        }

        const categorys = new Category(categoryData);

        await categorys.save();

        return NextResponse.json({
            success: true,
            data: categorys
        }, { status: 200 })

    } catch (error: any) {
        console.log("Error Find: ", error);

        return NextResponse.json({
            success: false,
            data: error.message,
        }, { status: 500 })
    }
}