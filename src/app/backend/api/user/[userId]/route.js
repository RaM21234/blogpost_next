import { MONGO_URI } from "@/app/backend/db";
import { NextResponse } from "next/server";
import User from "@/app/backend/models/User";
import mongoose from "mongoose";

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

export async function PUT(req, content) {
  console.log(content.params.userId);
  const id = content.params.userId;
  const payload = await req.json();
  console.log(payload);
  await connectToMongoDB();
  const result = await User.findByIdAndUpdate({ _id: id }, payload);

  return NextResponse.json({ result: result }, { status: 200 });
}

export async function GET(req, content) {
  const id = content.params.userId;
  await connectToMongoDB();
  const result = await User.findById({ _id: id });
  return NextResponse.json({ result: result }, { status: 200 });
}

export async function DELETE(req, content) {
  const id = content.params.userId;
  await connectToMongoDB();
  const result = await User.findByIdAndDelete({ _id: id });
  return NextResponse.json({ result: result }, { status: 200 });
}
