import { Navigate, Route, Routes } from "react-router-dom";
import AuthCallbackPage from "@/pages/AuthCallbackPage.tsx";
import Layout from "@/layouts/layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import DocsPage from "@/pages/DocsPage.tsx";
import AboutPage from "@/pages/AboutPage.tsx";
import SupportPage from "@/pages/SupportPage.tsx";
import ArticleSearchingPage from "@/pages/ArticleSearchingPage.tsx";
import ArticleDetailPage from "@/pages/ArticleDetailPage.tsx";
import MyArticlesPage from "@/pages/MyArticlesPage.tsx";
import UserProfilePage from "@/pages/UserProfilePage.tsx";
import WritingPage from "@/pages/WritingPage.tsx";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
        <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>}/>
        <Route path="/about" element={<Layout><AboutPage/></Layout>}/>
        <Route path="/docs" element={<Layout><DocsPage/></Layout>}/>
        <Route path="/support" element={<Layout><SupportPage/></Layout>}/>
        <Route path="/articles/search" element={<Layout><ArticleSearchingPage/></Layout>}/>
        <Route path="/article/detail/:articleId" element={<Layout><ArticleDetailPage/></Layout>}/>
        <Route path="/article/create" element={<Layout><WritingPage/></Layout>}/>
        <Route path="/my/articles" element={<Layout><MyArticlesPage/></Layout>}/>
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
  );
};

export default AppRoutes;
