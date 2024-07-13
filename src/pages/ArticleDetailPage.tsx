import { CompleteArticleData } from "@/types.ts";
import { useEffect, useState } from "react";
import { sleep } from "@/utils/GlobalUtils.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Rating, Skeleton, Stack, Typography } from "@mui/material";
import { fakeCompleteArticles } from "@/lib/dummyData.ts";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Article from "@/components/Article";

type ArticleDetailPageProps = {
  mode?: "user" | "viewer" | "admin";
}

const ArticleDetailPage = ({ mode = "viewer" }: ArticleDetailPageProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { articleId, initialArticleData } = location.state || {};
  const [articleData, setArticleData] = useState<CompleteArticleData>(initialArticleData);

  // fetch complete article data
  const [loading, setLoading] = useState<boolean>(!initialArticleData);
  const fetchArticleData = async () => {
    try {
      setLoading(true);
      console.log(`fetch article data from backend: ${articleId}`);
      await sleep(1500);
      setArticleData(fakeCompleteArticles[0]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await fetchArticleData();
    }
    if (!articleData) {
      fetchData();
    }
  }, []);

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        <Button startIcon={<ArrowBackIosIcon fontSize="small"/>}
                sx={{ fontWeight: "bold", color: "black" }}
                onClick={() => {
                  if (!initialArticleData) {
                    navigate(-1);
                  } else {
                    navigate("/my/articles");
                  }
                }}>
          Back
        </Button>
        {!loading ? (
            <div className="w-full mt-8 flex flex-col justify-start items-start">
              {/*  article content  */}
              <Article articleData={articleData}/>
              {/*  author & meta data  */}
              <div
                  className="w-full mt-16 flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center md:gap-8">
                {/*  left  */}
                <div className="w-full flex flex-col justify-center items-start gap-4">
                  {/*  left - avatar  */}
                  <div>

                  </div>
                  {/*  right - author username  */}
                  <div></div>
                  {/*  right - author's article number  */}
                  <div>

                  </div>
                </div>
                {/*  right  */}
                <div>

                </div>
              </div>
            </div>
        ) : (
            /*  skeleton  */
            <Box width={"100%"} sx={{ marginTop: 4 }}>
              <Box>
                {/*  title  */}
                <Skeleton variant="rectangular" width={"58%"} height={55}/>
                {/*  subtitle  */}
                <Skeleton variant="text" sx={{ marginTop: 2, fontSize: "30px", width: "85%" }}/>
                {/*  meta data  */}
                <div className="w-full mt-8 space-y-2">
                  {/* author */}
                  <div className="w-full flex justify-start items-center gap-1">
                    <Skeleton variant="text" width={140} height={20}/>
                  </div>
                  <div className="w-full flex justify-start items-center gap-3">
                    <Skeleton variant="text" width={80} height={20}/>
                    <div className="w-1 h-4 border-r-2 border-gray-300"/>
                    <Skeleton variant="text" width={100} height={20}/>
                    <div className="w-1 h-4 border-r-2 border-gray-300"/>
                    {/* like comment view */}
                    <Skeleton variant="text" width={70} height={20}/>
                  </div>
                </div>
              </Box>
              <Box marginTop={5} display="flex" flexDirection="column" gap={1}>
                {/*  content  */}
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
                <Skeleton variant="text" sx={{ fontSize: "30px" }}/>
              </Box>
              {/*  tags  */}
              <Box marginTop={7} display="flex" gap={3}>
                <Skeleton variant="rounded" width={560} height={32}/>
              </Box>
              {/*  author  */}
              <Box marginTop={7} display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Skeleton variant="circular" width={70} height={70}/>
                  <Skeleton variant="text" width={180} height={60}/>
                  <Skeleton variant="text" width={210} height={60}/>
                </Box>
                <Box>
                  <Skeleton variant="rounded" width={300} height={40}/>
                  <Skeleton variant="rounded" width={300} height={40} sx={{marginTop: 3}}/>
                </Box>
              </Box>
              {/*  comment  */}
              <Box marginTop={7}>
                <Skeleton variant="rectangular" width={"100%"} height={120}/>
              </Box>
            </Box>
        )}
      </div>
  );
};

export default ArticleDetailPage;
