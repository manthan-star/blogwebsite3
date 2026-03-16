import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    birth: String;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    email: string;
    city: string;
    password: string;
    phone: number;
    role: 'admin' | 'author' | 'reader';
    image: string;
    url: string;
    createdAt: Date;
    updateAt: Date;
}

const userschema = new Schema<IUser>({
    username: { type: String },
    birth: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
    email: { type: String },
    city: { type: String },
    password: { type: String },
    phone: { type: Number },
    role: { type: String, enum: ['admin', 'user', 'author'], default: 'admin' },
    image: { type: String },
    url: { type: String }
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userschema);

export default User;
