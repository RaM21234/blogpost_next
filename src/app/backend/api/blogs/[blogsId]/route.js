import { MONGO_URI } from "@/app/backend/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/app/backend/models/Blog";

const connectToMongoDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("connected to Mongo DB");
        return; // Already connected
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("connected to Mongo DB");
    } catch (error) {
        console.log("error connecting to Mongo DB");
        throw new Error("Failed to connect to MongoDB");
    }
};
// todo 
export async function PUT(req, content) {
    console.log(content.params.blogsId);
    const id = content.params.blogsId;
    const payload = await req.json();
    console.log(payload);
    await connectToMongoDB();
    const result = await User.findByIdAndUpdate({ _id: id }, payload);

    return NextResponse.json({ result: result }, { status: 200 });
}

export async function DELETE(req, content) {
    const id = content.params.blogsId;
    console.log("delete id ", id)
    await connectToMongoDB();
    const result = await Blog.findByIdAndDelete({ _id: id });
    return NextResponse.json({ result: result }, { status: 200 });
}
