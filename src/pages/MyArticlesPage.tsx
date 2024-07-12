import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/contexts/NotificationContext.tsx";
import ArticleSearchModule from "@/components/ArticleSearchModule.tsx";

const MyArticlesPage = () => {
  // navigation
  const navigate = useNavigate();
  // notification
  const { showNotification } = useNotification();

  /*  create new article  */
  const handleCreateArticleButtonClick = () => {
    navigate("/article/create");
  }

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="w-full flex justify-between items-center">
          <div className="text-4xl font-bold">My Blogs</div>
          {/*  add article  */}
          <div className="hidden lg:block w-52">
            <Button variant="contained" sx={{ paddingY: "10px", textWrap: "nowrap", fontSize: "small" }}
                    onClick={handleCreateArticleButtonClick}>
              <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
              <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <Button startIcon={<ArrowBackIosIcon fontSize="small"/>}
                  sx={{ fontWeight: "bold", color: "black" }}
                  onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        {/*  add article  */}
        <div className="lg:hidden w-full mt-10 flex justify-end items-center">
          <Button sx={{ textWrap: "nowrap", fontSize: "small" }} onClick={handleCreateArticleButtonClick}>
            <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
            <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
          </Button>
        </div>

        <div className="w-full -mt-8">
          <ArticleSearchModule mode="individual"/>
        </div>
      </div>
  );
};

export default MyArticlesPage;
