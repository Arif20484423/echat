import { auth } from "@/auth";
import { UserFile } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

//in use
export async function POST(req: NextRequest) {
  try {
    const { userid } = await req.json();
    const data = await UserFile.find({
      user: userid,
    }).populate({ path: "file", match: { type: "image" } });
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
