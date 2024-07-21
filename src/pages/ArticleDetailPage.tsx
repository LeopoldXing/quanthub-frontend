import { ArticleComment, CompleteArticleData } from "@/types.ts";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Skeleton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Article from "@/components/Article";
import avatar from "@/assets/default_avarta.png";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import CommentSection from "@/components/CommentSection.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotification } from "@/contexts/NotificationContext.tsx";
import { useDeleteArticle, useGetArticle } from "@/api/ArticleApi.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { useDeleteComment, useLeaveComment, useUpdateComment } from "@/api/CommentApi.ts";
import ConfirmBox from "@/components/ConfirmBox.tsx";

const ArticleDetailPage = () => {
  const { articleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { initialArticleData } = location.state || {};
  const [articleData, setArticleData] = useState<CompleteArticleData>(initialArticleData);
  const { isAuthenticated } = useAuth0();

  const commentSectionRef = useRef<HTMLDivElement>(null);

  const { showNotification } = useNotification();

  // dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // fetch complete article data
  const { getArticle, isLoading } = useGetArticle();
  const fetchArticleData = async () => {
    const article = await getArticle(articleId!);
    setArticleData(article);
  }
  useEffect(() => {
    if (!articleData) {
      fetchArticleData();
    }
  }, []);

  /*  like this article  */
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (articleData) {
      setIsLiking(articleData.isLiking || false);
      setLikes(Number(articleData.likes));
    }
  }, [articleData]);

  const toggleLikingButton = () => {
    if (isLiking) {
      setLikes(likes - 1);
    } else {
      setIsDisliking(false);
      setLikes(likes + 1);
    }
    setIsLiking(!isLiking);
  };

  const toggleDislikingButton = () => {
    if (isLiking) {
      setIsLiking(false);
      setLikes(likes - 1);
    }
    setIsDisliking(!isDisliking);
  };

  /*  edit article  */
  const handleEditArticle = () => {
    navigate("/article/create", {
      state: {
        articleData: articleData
      }
    })
  }
  /*  delete article  */
  const { deleteArticle } = useDeleteArticle();
  const handleDeleteArticle = async () => {
    await deleteArticle(articleId!);
    console.log("delete article");
    navigate("/my/articles");
    window.scrollTo(0, 0);
    showNotification({
      message: "Article Deleted",
      severity: "success",
      horizontal: "right",
      vertical: "bottom"
    });
  }

  const handleScrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  /*  handle comment  */
  const { addComment } = useLeaveComment();
  const createComment = async (content: string) => {
    const response = await addComment({
      content,
      articleId: articleId!,
    });
    if (!response) {
      // something wrong
      showNotification({
        horizontal: 'right',
        vertical: 'top',
        severity: 'error',
        message: 'Something unexpected happened, please try again'
      });
    } else {
      // comment published
      console.log("发布成功")
      console.log(response);
      setArticleData(prevState => ({ ...prevState, comments: [response, ...prevState.comments] }));
    }
  }
  /*  handle delete  */
  const { deleteComment } = useDeleteComment();
  const handleDeleteComment = async (comment: ArticleComment) => {
    if (await deleteComment(comment.id)) {
      // successful
      showNotification({
        message: "Comment deleted",
        severity: "success",
        horizontal: "right",
        vertical: "top"
      });
      setArticleData(prevState => ({
        ...prevState,
        comments: prevState.comments.filter(prevComment => comment.id !== prevComment.id)
      }));
    } else {
      // something wrong
      showNotification({
        message: "Something unexpected happened, please try again.",
        severity: "error",
        horizontal: "right",
        vertical: "top"
      });
    }
  }
  /*  handle edit  */
  const { updateComment } = useUpdateComment();
  const handleEditComment = async (comment: ArticleComment) => {
    const response = await updateComment(comment);
    if (response) {
      showNotification({
        message: "Comment updated",
        severity: "success",
        horizontal: "right",
        vertical: "top"
      });
      setArticleData(prevState => ({
        ...prevState,
        comments: prevState.comments.map(prevComment => {
          if (prevComment.id === comment.id) {
            return comment;
          }
          return prevComment;
        })
      }))
    } else {
      // something wrong
      showNotification({
        message: "Something unexpected happened, please try again.",
        severity: "error",
        horizontal: "right",
        vertical: "top"
      });
    }
  }

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        <Button startIcon={<ArrowBackIosIcon fontSize="small"/>}
                sx={{ fontWeight: "bold", color: "black" }}
                onClick={() => {
                  if (!initialArticleData) {
                    navigate("/articles");
                  } else {
                    navigate("/my/articles");
                  }
                }}>
          Back
        </Button>
        {!isLoading && articleData ? (
            <div className="w-full mt-8 flex flex-col justify-start items-start">
              {/*  article content  */}
              <Article articleData={articleData} likes={likes} commentCount={0} views={1}
                       onDelete={() => setDialogOpen(true)}
                       onEdit={handleEditArticle}/>
              {/*  like comment share  */}
              <div className="w-full mt-10 flex justify-start items-center gap-4">
                <Button startIcon={<ThumbUpIcon fontSize="large"/>}
                        variant={isLiking ? "contained" : "outlined"}
                        sx={{ minWidth: "85px", borderRadius: "20px" }}
                        onClick={toggleLikingButton} disabled={!isAuthenticated}
                        color={isLiking ? "success" : "primary"}>{likes}</Button>
                <Button color={isDisliking ? "warning" : "primary"} variant={isDisliking ? "contained" : "outlined"}
                        sx={{ minWidth: "40px", borderRadius: "20px" }} disabled={!isAuthenticated}
                        onClick={toggleDislikingButton}>
                  <ThumbDownIcon fontSize="medium"/>
                </Button>
                <Button startIcon={<CommentIcon fontSize="large"/>} variant="outlined"
                        sx={{ minWidth: "80px", borderRadius: "20px" }}
                        onClick={handleScrollToComments}>{articleData.comments?.length || 0}</Button>
                <Button startIcon={<ShareIcon fontSize="large"/>} variant="outlined"
                        sx={{ textTransform: "none", minWidth: "90px", borderRadius: "20px" }}>Share</Button>
              </div>
              {/*  author & meta data  */}
              <div
                  className="w-full mt-10 px-16 py-8 flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center md:gap-8 border border-gray-300 rounded-xl">
                {/*  1  */}
                <div className="w-full">
                  <Avatar sx={{ height: "100px", width: "100px" }} src={articleData.author.avatarLink || avatar}
                          alt={articleData.author.username}/>
                </div>
                {/*  2 - author username  */}
                <div>
                  <div className="mt-8 text-lg font-bold text-nowrap">{articleData.author.username}</div>
                  {/*  right - author's article number  */}
                  <div>

                  </div>
                </div>
                {/*  right  */}
                <div>

                </div>
              </div>
              {/*  comment area  */}
              <div className="w-full mt-10" ref={commentSectionRef}>
                <CommentSection comments={articleData.comments} onComment={createComment}
                                onDelete={handleDeleteComment} onUpdate={handleEditComment}/>
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
                  <Skeleton variant="rounded" width={300} height={40} sx={{ marginTop: 3 }}/>
                </Box>
              </Box>
              {/*  comment  */}
              <Box marginTop={7}>
                <Skeleton variant="rectangular" width={"100%"} height={120}/>
              </Box>
            </Box>
        )}
        <ConfirmBox open={dialogOpen} handleClose={() => setDialogOpen(false)} config={{
          title: 'Delete this article?',
          description: "This article will be delete permanently, no way to undo.",
          option1Color: 'primary',
          option1Text: 'Cancel',
          option1Variant: 'text',
          option3Text: 'Delete',
          option3Color: 'error',
          option3StartIcon: <DeleteIcon/>,
          option3Variant: 'contained',
          option3LoadingPosition: 'start',
          option3Action: handleDeleteArticle
        }}/>
      </div>
  );
};

export default ArticleDetailPage;
