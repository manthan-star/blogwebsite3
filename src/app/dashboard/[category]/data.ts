import { getAllChildCategory } from "../../../../lib/getNestedId";
import { Blog, Category } from "../../../../model";
 
export async function dataApi(category: string) {
    const cat = await Category.findOne({ category })
    const data: any = await getAllChildCategory(cat._id)
    const selflId = (cat._id).toString();
    const newData: any = [...data, selflId]
    const categorys = await Blog.find({ category: { $in: newData } });
    console.log({ categorys })

    return categorys;
}