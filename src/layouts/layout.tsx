import React from "react";
import Header from "@/components/Header.tsx";
import Hero from "@/components/Hero.tsx";
import Footer from "@/components/Footer.tsx";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
      <div className="min-h-screen w-screen bg-gradient-to-r from-[#f0f4f8] to-[#d9e2ec]">
        <Header/>
        <Hero/>
        <div className="w-screen mx-auto px-10 pt-10 md:px-28 flex-1">
          {children}
        </div>
        <Footer/>
      </div>
  );
};

export default Layout;
