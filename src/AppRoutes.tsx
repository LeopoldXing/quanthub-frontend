import { Navigate, Route, Routes } from "react-router-dom";
import AuthCallbackPage from "@/pages/AuthCallbackPage.tsx";
import Layout from "@/layouts/layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import DocumentationPage from "@/pages/DocumentationPage.tsx";
import AboutPage from "@/pages/AboutPage.tsx";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
        <Route path="/user-profile" element={<Layout><span>USER PROFILE PAGE</span></Layout>}/>
        <Route path="/about" element={<Layout><AboutPage/></Layout>}/>
        <Route path="/docs" element={<Layout><DocumentationPage/></Layout>}/>
        <Route path="/articles" element={<Layout><span>ARTICLES PAGE</span></Layout>}/>
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
  );
};

export default AppRoutes;
