import { UserFolder } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {user} = await req.json();
  var root = await UserFolder.findOne({ name: "root", user: user });
  if (!root) {
    root = await UserFolder.create({
      user: user,
      name: "root",
      parentfolder: null,
      changeallowed: false,
    });
    const upload = await UserFolder.create({
      user: user,
      name: "upload",
      parentfolder: root._id,
      changeallowed: false,
    });
    const received = await UserFolder.create({
      user: user,
      name: "received",
      parentfolder: root._id,
      changeallowed: false,
    });
  }
  return NextResponse.json({ success: true, data: root });
}
