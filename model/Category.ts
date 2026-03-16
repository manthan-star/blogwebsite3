import mongoose, { Schema } from "mongoose";

export interface ICategory extends Document {
    category: string;
    description: string;
    mainId: mongoose.Types.ObjectId | null;
    createdAt: Date;
    updateAt: Date;
}

const categorySchema = new Schema<ICategory>({
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    mainId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.models.Category || mongoose.model("Category", categorySchema);