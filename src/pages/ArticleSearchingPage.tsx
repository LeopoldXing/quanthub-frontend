import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import ArticleIcon from '@mui/icons-material/Article';
import PublicIcon from '@mui/icons-material/Public';
import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "@/global.css";
import { useNavigate } from "react-router-dom";
import ArticleSearchForm, { ArticleSearchFormInterface } from "@/forms/ArticleSearchForm.tsx";
import Cookies from "js-cookie";
import { useNotification } from "@/contexts/NotificationContext.tsx";

const ArticleSearchingPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  /*  section  */
  const [section, setSection] = useState<"article" | "announcement" | "draft">("article");
  useEffect(() => {
    updateType();
  }, [section]);

  /*  update what type of content user is querying  */
  const searchFormRef = useRef<ArticleSearchFormInterface>();
  const updateType = () => {
    if (searchFormRef.current) {
      if(section === 'draft') {
        searchFormRef.current.changeType('all', true);
      } else {
        searchFormRef.current.changeType(section, false);
      }
    }
  }

  /*  create new article  */
  const handleWriteSomething = () => {
    const cookie = Cookies.get("quanthub-user");
    if (cookie) {
      const parsedCookie = JSON.parse(cookie);
      if (parsedCookie) {
        navigate("/article/create");
        window.scrollTo(0, 0);
        return;
      }
    }
    // user didn't logged in
    showNotification({
      vertical: 'bottom',
      horizontal: 'left',
      severity: 'warning',
      message: 'Please log in first'
    });
  }

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="w-full flex justify-between items-center">
          <div
              className="w-full flex flex-col justify-start items-center lg:flex-row lg:justify-start lg:items-end lg:gap-16">
            <div className="text-4xl font-bold">Blogs</div>
            {/*  buttons  */}
            <div className="mt-8 lg:mt-0">
              <Button variant="text" onClick={() => setSection("article")} size="small" sx={{
                mr: "40px",
                flex: "flex",
                alignItems: "center",
                color: `${section === "article" ? "#27ae60" : "#000000"}`
              }}>
                <ArticleIcon sx={{ mr: "5px" }}/>
                <Typography sx={{ fontSize: "14px" }} fontWeight={section === "article" ? "bold" : ""}>
                  Articles
                </Typography>
              </Button>
              <Button variant="text" onClick={() => setSection("announcement")} size="small" sx={{
                flex: "flex",
                alignItems: "center",
                color: `${section === "announcement" ? "#27ae60" : "#000000"}`
              }}>
                <PublicIcon sx={{ mr: "5px" }}/>
                <Typography sx={{ fontSize: "14px" }} fontWeight={section === "announcement" ? "bold" : ""}>
                  Announcements
                </Typography>
              </Button>
            </div>
          </div>
          {/*  add article  */}
          <div className="hidden lg:block w-52">
            <Button variant="contained" sx={{ paddingY: "10px", textWrap: "nowrap", fontSize: "small" }}
                    onClick={handleWriteSomething}>
              <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
              <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
            </Button>
          </div>
        </div>

        {/*  add article  */}
        <div className="lg:hidden w-full mt-10 flex justify-end items-center">
          <Button sx={{ textWrap: "nowrap", fontSize: "small" }} onClick={handleWriteSomething}>
            <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
            <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
          </Button>
        </div>

        <ArticleSearchForm ref={searchFormRef} type={section !== 'draft' ? section : 'all'} viewerType="public"
                           isDraft={section === 'draft'} onSubmit={(data) => console.log(data)}/>
      </div>
  );
};

export default ArticleSearchingPage;
