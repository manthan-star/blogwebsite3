import { Category } from "../model";

export async function getAllChildCategory(categoryId: string) {
    let result: string[] = [];
    let queue: string[] = [categoryId];
 
    while (queue.length > 0) {
        const currentCategory = queue.shift();
        const categorys = await Category.find({
            mainId: currentCategory
        }).lean();
        
        // console.log({categorys})
 
        if (!categorys.length) continue;
 
        const ids = categorys.map((cat: any) => cat._id.toString());
        result.push(...ids);
        queue.push(...ids);
    }
 
    return result;
}
 