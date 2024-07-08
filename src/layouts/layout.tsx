import React from "react";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-[#d9e2ec] to-[#f0f4f8]">
        <Header/>
        <div className="max-w-[1700px] mx-auto px-10 md:px-28 pt-12 flex-1">
          {children}
        </div>
        <Footer/>
      </div>
  );
};

export default Layout;
