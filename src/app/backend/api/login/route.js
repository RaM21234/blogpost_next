import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../../models/User";
import { MONGO_URI } from "../../db";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;
console.log(secretKey);
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

export async function POST(request) {
  const payload = await request.json();

  const { email, password } = payload;
  const token = generateToken(payload);

  if (request.method === "POST") {
    try {
      await connectToMongoDB();
      const user = await User.findOne({ email, password }).exec();
      if (user) {
        console.log("user from mongo db ", user)
        // Authentication successful
        return NextResponse.json(
          { success: true, message: "Login successful", token: token, data: user },
          { status: 200 }
        );
      } else {
        // Authentication failed
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    // Handle other HTTP methods
    return NextResponse.json(
      { success: false, message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}
