import mongoose from "mongoose";

export async function connectDB() {
  console.log("started connecting");
  try {
    await mongoose.connect("mongodb://localhost:27017/echat");
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
}
