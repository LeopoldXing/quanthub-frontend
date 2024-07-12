import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NotificationProvider } from "@/contexts/NotificationContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <NotificationProvider>
        <div className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#F0FCFF]">
          <Header/>
          <div className="max-w-[1600px] min-w-[569px] mx-auto px-10 lg:px-28 pt-12 flex-1">
            {children}
          </div>
          <Footer/>
        </div>
      </NotificationProvider>
  );
};

export default Layout;
