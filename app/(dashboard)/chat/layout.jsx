import React from "react";
import Loading from "@/app/_UIComponents/Loading.jsx";
import { Suspense } from "react";
const Layout = ({ children }) => {
  return (
    <>
      {children}
      {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
    </>
  );
};

export default Layout;
