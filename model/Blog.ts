import mongoose from "mongoose";

export interface IBlog extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    // userId: mongoose.Schema.Types.ObjectId;
    publishAt: Date;
    category: mongoose.Schema.Types.ObjectId;
    image: string;
    url: string;
    createdAt: Date;
    updateAt: Date;
}

const BlogSchema = new mongoose.Schema<IBlog>({
    image: {
        type: String,
    },
    content: {
        type: String,
    },
    excerpt: {
        type: String,
    },
    slug: {
        type: String,
    },
    title: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    publishAt: {
        type: Date,
        default: Date.now,
    },
    url: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    }
}, {
    timestamps: true
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);