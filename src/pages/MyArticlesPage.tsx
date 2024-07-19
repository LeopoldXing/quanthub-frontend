import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/contexts/NotificationContext.tsx";
import ArticleSearchModule from "@/components/ArticleSearchModule.tsx";
import ArticleIcon from "@mui/icons-material/Article";
import PublicIcon from "@mui/icons-material/Public";
import DraftsIcon from '@mui/icons-material/Drafts';
import { useState } from "react";

type MyArticlesPageProps = {
  isAdmin?: boolean;
}

const MyArticlesPage = ({ isAdmin = true }: MyArticlesPageProps) => {
  // navigation
  const navigate = useNavigate();
  // notification
  const { showNotification } = useNotification();

  /*  section  */
  const [section, setSection] = useState<'article' | 'announcement' | 'draft'>("article");
  const handleSectionClick = (selectedSection: 'article' | 'announcement' | 'draft') => {
    setSection(selectedSection);
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
              className="w-full flex flex-col justify-start items-center xl:flex-row xl:justify-start xl:items-end xl:gap-16">
            <div className="text-4xl font-bold">My Blogs</div>
            {isAdmin ? (
                /*  buttons  */
                <div className="mt-8 xl:mt-0">
                  <Button variant="text" onClick={() => handleSectionClick("article")} size="small" sx={{
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
                  <Button variant="text" onClick={() => handleSectionClick("announcement")} size="small" sx={{
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
                  <Button variant="text" onClick={() => handleSectionClick("draft")} size="small" sx={{
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
                  <Button variant="text" onClick={() => handleSectionClick("article")} size="small" sx={{
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
                  <Button variant="text" onClick={() => handleSectionClick("draft")} size="small" sx={{
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

        <ArticleSearchModule mode="user"/>
      </div>
  );
};

export default MyArticlesPage;
