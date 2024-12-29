"use server";

import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null };
}
async function dbConnect() {
  if (cached.conn) return cached.conn;
  try {
    cached.conn = await mongoose.connect(process.env.DB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Failure " + error);
  }
  return cached.conn;
}

export default dbConnect;