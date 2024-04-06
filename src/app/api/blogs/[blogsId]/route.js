
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { MONGO_URI } from "@/app/utils/db";
import Blog from "@/app/models/Blog";

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
    try {

        const payload = await req.json();
        console.log(payload);
        await connectToMongoDB();

        // Find and update the blog post by its ID
        const result = await Blog.findByIdAndUpdate(id, payload, { new: true });

        // Check if the result is null
        if (!result) {

            return NextResponse.json({ error: 'Blog post not found' });
        }

        // Return the updated blog post
        return NextResponse.json({ result: result }, { status: 200 });
    } catch (error) {
        console.error('Error updating blog post:', error);
        return NextResponse.json({ error: 'Internal server error' });
    }

}

export async function GET(req, content) {
    const id = content.params.blogsId;
    console.log("get id ", id)
    await connectToMongoDB();
    const result = await Blog.findById({ _id: id });
    return NextResponse.json({ result: result }, { status: 200 });
}

export async function DELETE(req, content) {
    const id = content.params.blogsId;
    console.log("delete id ", id)
    await connectToMongoDB();
    const result = await Blog.findByIdAndDelete({ _id: id });
    return NextResponse.json({ result: result }, { status: 200 });
}
