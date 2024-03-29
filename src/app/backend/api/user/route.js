import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { MONGO_URI } from "../../db";
import User from "../../models/User";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

function generateToken(payload) {
  const token = jwt.sign(
    { email: payload.email, password: payload.password },
    secretKey,
    { expiresIn: "1h" }
  );
  return token;
}

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

export async function GET() {
  try {
    await connectToMongoDB();
    let data = await User.find();
    // console.log(data);
    return NextResponse.json({ result: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const payload = await request.json();
  const token = generateToken(payload);
  try {
    await connectToMongoDB();
    let user = new User(payload);
    const result = await user.save();
    return NextResponse.json({ result: result, token: token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
