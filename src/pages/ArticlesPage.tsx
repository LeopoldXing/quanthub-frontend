import Button from "@mui/material/Button";
import { useState } from "react";
import ArticleIcon from '@mui/icons-material/Article';
import PublicIcon from '@mui/icons-material/Public';
import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "@/global.css";
import { useNavigate } from "react-router-dom";
import ArticleSearchModule from "@/components/ArticleSearchModule.tsx";

const ArticlesPage = () => {
  const navigate = useNavigate();

  /*  section  */
  const [isAnnouncementSection, setIsAnnouncementSection] = useState<boolean>(false);
  const handleSectionClick = (section: string) => {
    setIsAnnouncementSection(section === "announcement");
  }

  /*  create new article  */
  const handleCreateArticleButtonClick = () => {
    navigate("/article/create");
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
              <Button variant="text" onClick={() => handleSectionClick("article")} size="small" sx={{
                mr: "40px",
                flex: "flex",
                alignItems: "center",
                color: `${isAnnouncementSection ? "#000000" : "#27ae60"}`
              }}>
                <ArticleIcon sx={{ mr: "5px" }}/>
                <Typography sx={{ fontSize: "14px" }} fontWeight={isAnnouncementSection ? "" : "bold"}>
                  Articles
                </Typography>
              </Button>
              <Button variant="text" onClick={() => handleSectionClick("announcement")} size="small" sx={{
                flex: "flex",
                alignItems: "center",
                color: `${isAnnouncementSection ? "#27ae60" : "#000000"}`
              }}>
                <PublicIcon sx={{ mr: "5px" }}/>
                <Typography sx={{ fontSize: "14px" }} fontWeight={isAnnouncementSection ? "bold" : ""}>
                  Announcements
                </Typography>
              </Button>
            </div>
          </div>
          {/*  add article  */}
          <div className="hidden lg:block w-52">
            <Button variant="contained" sx={{ paddingY: "10px", textWrap: "nowrap", fontSize: "small" }}
                    onClick={handleCreateArticleButtonClick}>
              <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
              <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
            </Button>
          </div>
        </div>

        {/*  add article  */}
        <div className="lg:hidden w-full mt-10 flex justify-end items-center">
          <Button sx={{ textWrap: "nowrap", fontSize: "small" }} onClick={handleCreateArticleButtonClick}>
            <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
            <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
          </Button>
        </div>

        <ArticleSearchModule/>
      </div>
  );
};

export default ArticlesPage;
