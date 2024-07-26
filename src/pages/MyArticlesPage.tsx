import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import PublicIcon from "@mui/icons-material/Public";
import DraftsIcon from '@mui/icons-material/Drafts';
import { useEffect, useRef, useState } from "react";
import ArticleSearchForm, { ArticleSearchFormInterface } from "@/forms/ArticleSearchForm.tsx";
import { CurrentUserInfo } from "@/types.ts";
import Cookies from "js-cookie";

const MyArticlesPage = () => {
  // navigation
  const navigate = useNavigate();

  /*  update what type of content user is querying  */
  const searchFormRef = useRef<ArticleSearchFormInterface>();
  const updateType = () => {
    if (searchFormRef.current) {
      if (section === 'draft') {
        searchFormRef.current.changeType('all', true);
      } else {
        searchFormRef.current.changeType(section, false);
      }
    }
  }

  /*  section  */
  const [section, setSection] = useState<'article' | 'announcement' | 'draft'>("article");
  useEffect(() => {
    updateType();
  }, [section]);

  /*  create new article  */
  const handleCreateArticleButtonClick = () => {
    navigate("/article/create");
  }

  const [currentUser, setCurrentUser] = useState<CurrentUserInfo | null>(null);
  useEffect(() => {
    const checkCookie = async () => {
      const cookie = Cookies.get("quanthub-user");
      if (cookie) {
        try {
          const parsedCookie = JSON.parse(cookie);
          setCurrentUser(parsedCookie);
        } catch (error) {
          console.error("Error parsing cookie:", error);
          setCurrentUser(null);
        }
      }
    };

    setTimeout(checkCookie, 500);
  }, []);

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="w-full flex justify-between items-center">
          <div
              className="w-full flex flex-col justify-start items-center xl:flex-row xl:justify-start xl:items-end xl:gap-16">
            <div className="text-4xl font-bold">My Blogs</div>
            {currentUser && currentUser.user.role.toLowerCase() === 'admin' ? (
                /*  buttons  */
                <div className="mt-8 xl:mt-0">
                  <Button variant="text" onClick={() => setSection("article")} size="small" sx={{
                    mr: "40px",
                    flex: "flex",
                    alignItems: "center",
                    color: `${section === "article" ? "#27ae60" : "#000000"}`
                  }}>
                    <ArticleIcon sx={{ mr: "5px" }}/>
                    <Typography sx={{ fontSize: "14px" }} fontWeight={section === 'article' ? 'bold' : ''}>
                      Articles
                    </Typography>
                  </Button>
                  <Button variant="text" onClick={() => setSection("announcement")} size="small" sx={{
                    mr: "40px",
                    flex: "flex",
                    alignItems: "center",
                    color: `${section === 'announcement' ? "#27ae60" : "#000000"}`
                  }}>
                    <PublicIcon sx={{ mr: "5px" }}/>
                    <Typography sx={{ fontSize: "14px" }} fontWeight={section === "announcement" ? "bold" : ""}>
                      Announcements
                    </Typography>
                  </Button>
                  <Button variant="text" onClick={() => setSection("draft")} size="small" sx={{
                    flex: "flex",
                    alignItems: "center",
                    color: `${section === 'draft' ? "#27ae60" : "#000000"}`
                  }}>
                    <DraftsIcon sx={{ mr: "5px" }}/>
                    <Typography sx={{ fontSize: "14px" }} fontWeight={section === 'draft' ? "bold" : ""}>
                      Draft
                    </Typography>
                  </Button>
                </div>
            ) : (
                /*  buttons  */
                <div className="mt-8 xl:mt-0">
                  <Button variant="text" onClick={() => setSection("article")} size="small" sx={{
                    mr: "40px",
                    flex: "flex",
                    alignItems: "center",
                    color: `${section === "article" ? "#27ae60" : "#000000"}`
                  }}>
                    <ArticleIcon sx={{ mr: "5px" }}/>
                    <Typography sx={{ fontSize: "14px" }} fontWeight={section === 'article' ? "bold" : ""}>
                      Articles
                    </Typography>
                  </Button>
                  <Button variant="text" onClick={() => setSection("draft")} size="small" sx={{
                    flex: "flex",
                    alignItems: "center",
                    color: `${section === 'draft' ? "#27ae60" : "#000000"}`
                  }}>
                    <DraftsIcon sx={{ mr: "5px" }}/>
                    <Typography sx={{ fontSize: "14px" }} fontWeight={section === 'draft' ? "bold" : ""}>
                      Draft
                    </Typography>
                  </Button>
                </div>
            )}
          </div>

          {/*  add article  */}
          <div className="hidden xl:block w-52">
            <Button variant="contained" sx={{ paddingY: "10px", textWrap: "nowrap", fontSize: "small" }}
                    onClick={handleCreateArticleButtonClick}>
              <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
              <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
            </Button>
          </div>
        </div>

        {/*  add article  */}
        <div className="xl:hidden w-full mt-10 flex justify-end items-center">
          <Button sx={{ textWrap: "nowrap", fontSize: "small" }} onClick={handleCreateArticleButtonClick}>
            <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
            <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
          </Button>
        </div>

        <ArticleSearchForm ref={searchFormRef} type={section !== 'draft' ? section : 'all'}
                           isDraft={section === 'draft'} viewerType="self" onSubmit={(data) => {
          console.log("搜索表单提交 -> ")
          console.log(data)
        }}/>
      </div>
  );
};

export default MyArticlesPage;
