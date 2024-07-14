import { Navigate, Route, Routes } from "react-router-dom";
import AuthCallbackPage from "@/pages/AuthCallbackPage.tsx";
import Layout from "@/layouts/layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import DocsPage from "@/pages/DocsPage.tsx";
import AboutPage from "@/pages/AboutPage.tsx";
import SupportPage from "@/pages/SupportPage.tsx";
import ArticlesPage from "@/pages/ArticlesPage.tsx";
import ArticleDetailPage from "@/pages/ArticleDetailPage.tsx";
import ArticleModificationPage from "@/pages/ArticleModificationPage.tsx";
import MyArticlesPage from "@/pages/MyArticlesPage.tsx";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
        <Route path="/user-profile" element={<Layout><span>USER PROFILE PAGE</span></Layout>}/>
        <Route path="/about" element={<Layout><AboutPage/></Layout>}/>
        <Route path="/docs" element={<Layout><DocsPage/></Layout>}/>
        <Route path="/support" element={<Layout><SupportPage/></Layout>}/>
        <Route path="/articles" element={<Layout><ArticlesPage/></Layout>}/>
        <Route path="/article/detail" element={<Layout><ArticleDetailPage/></Layout>}/>
        <Route path="/article/create" element={<Layout><ArticleModificationPage/></Layout>}/>
        <Route path="/my/articles" element={<Layout><MyArticlesPage/></Layout>}/>
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
  );
};

export default AppRoutes;
