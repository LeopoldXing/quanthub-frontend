import { Navigate, Route, Routes } from "react-router-dom";
import AuthCallbackPage from "@/pages/AuthCallbackPage.tsx";
import Layout from "@/layouts/layout.tsx";
import HomePage from "./pages/HomePage.tsx";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout><HomePage/></Layout>}/>
        <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
        <Route path="/user-profile" element={<span>USER PROFILE PAGE</span>}/>
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
  );
};

export default AppRoutes;
