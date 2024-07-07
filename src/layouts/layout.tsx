import React from "react";
import Header from "@/components/Header.tsx";
import Hero from "@/components/Hero.tsx";
import Footer from "@/components/Footer.tsx";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
      <div className="min-h-screen flex flex-col">
        <Header/>
        <Hero/>
        <div className="mx-auto py-10 container flex-1">
          {children}
        </div>
        <Footer/>
      </div>
  );
};

export default Layout;
