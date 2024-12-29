import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../models/user";
export async function POST(request: NextRequest) {
  const req = await request.json();
  try {
    const userExist = await User.findOne({ email: req.email });
    if (userExist) {
      return NextResponse.json({ success: true, user: userExist });
    } else {
      const userCreated = await User.create({ email: req.email });
      return NextResponse.json({ success: true, user: userCreated });
    }
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
