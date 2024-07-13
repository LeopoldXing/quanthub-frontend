import { CompleteArticleData } from "@/types.ts";
import { useEffect, useState } from "react";
import { sleep } from "@/utils/GlobalUtils.ts";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLocation, useNavigate } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
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
      <>
        <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
          <Button startIcon={<ArrowBackIosIcon fontSize="small"/>}
                  sx={{ fontWeight: "bold", color: "black", marginBottom: 4 }}
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
              /*  article content  */
              <Article articleData={articleData}/>
          ) : (
              /*  skeleton  */
              <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="text" sx={{ fontSize: '1rem' }}/>
                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="circular" width={40} height={40}/>
                <Skeleton variant="rectangular" width={210} height={60}/>
                <Skeleton variant="rounded" width={210} height={60}/>
              </Stack>
          )}
        </div>
        <LoadingButton variant="contained" loading={loading} onClick={fetchArticleData}>Fetch data</LoadingButton>
      </>

  );
};

export default ArticleDetailPage;
