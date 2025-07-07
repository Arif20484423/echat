import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SetSocket from "../_Components/SetUserSocket";
const Layout = async ({ children }) => {
  const session = await auth();
  if (session == null) {
    redirect("/user/signin");
  } else {
    console.log(session);
  }

  return (
    <>
      <SetSocket />
      {children}{" "}
    </>
  );
};

export default Layout;
