import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/contexts/NotificationContext.tsx";
import ArticleSearchModule from "@/components/ArticleSearchModule.tsx";
import ArticleIcon from "@mui/icons-material/Article";
import PublicIcon from "@mui/icons-material/Public";
import { useState } from "react";

type MyArticlesPageProps = {
  isAdmin?: boolean;
}

const MyArticlesPage = ({ isAdmin = false }: MyArticlesPageProps) => {
  // navigation
  const navigate = useNavigate();
  // notification
  const { showNotification } = useNotification();

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
          <div className="w-full lg:flex justify-start items-end lg:gap-16">
            <div className="text-4xl font-bold">My Blogs</div>
            {/*  admin buttons - small screen  */}
            {isAdmin && (
                <div className="hidden lg:block">
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
            )}
          </div>

          {/*  add article - large screen  */}
          <div className="hidden lg:block w-52">
            <Button variant="contained" sx={{ paddingY: "10px", textWrap: "nowrap", fontSize: "small" }}
                    onClick={handleCreateArticleButtonClick}>
              <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
              <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
            </Button>
          </div>
          {/*  add article - small screen  */}
          <div className="lg:hidden w-52">
            <Button sx={{ textWrap: "nowrap", fontSize: "small" }} onClick={handleCreateArticleButtonClick}>
              <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
              <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
            </Button>
          </div>
        </div>

        {/*  admin buttons - small screen  */}
        {isAdmin && (
            <div className="lg:hidden mt-12">
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
        )}

        <div style={{ minHeight: '70vh' }} className="w-full">
          <ArticleSearchModule mode="user"/>
        </div>
      </div>
  );
};

export default MyArticlesPage;
