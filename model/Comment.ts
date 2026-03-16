import mongoose, { Schema } from "mongoose";

export interface IComment extends Document {
    userId: mongoose.Types.ObjectId;
    // username: string;
    blogId: mongoose.Types.ObjectId;
    comment: string;
    status: 'pending' | 'approve' | 'reject'
}

const commentSchema = new Schema<IComment>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    // username: {
    //     type: String,
        
    // },
    status: { 
        type: String, 
        enum: ['pending', 'approve', 'reject'], 
        default: 'pending' 
    },
    comment: { 
        type: String, 
        required: true 
    },
}, {
    timestamps: true
});

export default mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);