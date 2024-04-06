import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { MONGO_URI } from "@/app/utils/db";
import Blog from "@/app/models/Blog";

// A function to handle MongoDB connection
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

export async function GET(request) {
  try {
    const userId = request.headers.get('User-Id'); // Get the value of 'User-Id' header
    console.log("user id ", userId)
    if (!userId) {
      throw new Error('User ID not provided in headers');
    }

    await connectToMongoDB();

    // Use the user ID to search for blog posts by that author
    let data = await Blog.find({ author: userId });

    return NextResponse.json({ result: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(request) {
  const payload = await request.json();
  console.log("blog payload", payload);
  try {
    await connectToMongoDB();
    let blog = new Blog(payload);
    const result = await blog.save();
    console.log("blog result", result);
    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
