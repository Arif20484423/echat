import mongoose from "mongoose";

export async function connectDB() {
  console.log("started connecting");
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
}
