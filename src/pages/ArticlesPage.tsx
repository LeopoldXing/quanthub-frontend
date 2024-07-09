import Button from "@mui/material/Button";
import { useState } from "react";
import ArticleIcon from '@mui/icons-material/Article';
import PublicIcon from '@mui/icons-material/Public';
import { Typography } from "@mui/material";
import SearchBox from "@/components/SearchBox.tsx";

const ArticlesPage = () => {
  /*  section  */
  const [isAnnouncementSection, setIsAnnouncementSection] = useState<boolean>(false);
  const handleSectionClick = (section: string) => {
    setIsAnnouncementSection(section === "announcement");
  }

  /*  search  */
  const handleSearch = (keyword: string): void => {
    console.log(keyword);
  }

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="w-full flex justify-between items-center">
          <div className="text-4xl font-bold">Articles</div>
          <div>
            <Button variant="text" onClick={() => handleSectionClick("article")} sx={{
              mr: "40px",
              flex: "flex",
              alignItems: "center"
            }}>
              <ArticleIcon sx={{ mr: "5px" }}/>
              <Typography sx={{ fontSize: "16px" }} fontWeight={isAnnouncementSection ? "" : "bold"}>
                Articles
              </Typography>
            </Button>
            <Button variant="text" onClick={() => handleSectionClick("announcement")} sx={{
              flex: "flex",
              alignItems: "center"
            }}>
              <PublicIcon sx={{ mr: "5px" }}/>
              <Typography sx={{ fontSize: "16px" }} fontWeight={isAnnouncementSection ? "bold" : ""}>
                Announcements
              </Typography>
            </Button>
          </div>
        </div>

        {/*  search bar  */}
        <SearchBox handleSearch={handleSearch}/>

        {/*  content container  */}
        <div>
          {/*  left search result  */}
          <div>
            {/*  selected tag area  */}


            {/*  sorting panel  */}


            {/*  search result  */}
          </div>
          {/*  right extra info  */}
          <div>

          </div>
        </div>
      </div>
  );
};

export default ArticlesPage;
