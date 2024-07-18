import TagBar from "@/components/TagBar.tsx";
import { Typography } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { ArticleOverviewInfo } from "@/types.ts";
import { useNavigate } from "react-router-dom";

const ArticleOverviewListItem = ({ articleOverviewInfo }: {
  articleOverviewInfo?: ArticleOverviewInfo
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/article/detail", {
      state: {
        articleId: articleOverviewInfo!.id
      }
    })
  }

  return (
      <div className="w-full">
        {/*  title  */}
        <a onClick={handleNavigate}
           className="w-full flex flex-col 2xl:flex-row justify-start items-start 2xl:justify-between 2xl:items-center gap-2 2xl:gap-0 cursor-pointer">
          <div
              className="text-xl font-bold truncate max-w-md md:max-w-2xl lg:max-w-lg xl:max-w-lg 2xl:max-w-2xl">{articleOverviewInfo!.title}</div>
          {/*  author & update time  */}
          <div className="flex justify-center items-center gap-1">
            <Typography fontSize="13px">{articleOverviewInfo!.author.username}</Typography>
            <Typography fontSize="20px">·</Typography>
            <Typography fontSize="13px">{articleOverviewInfo!.updateTillToday}</Typography>
          </div>
        </a>
        {/*  content  */}
        <div className="w-full mt-3 flex justify-between items-center gap-6">
          {/*  left  */}
          <div className={`w-full ${articleOverviewInfo!.coverImageLink ? 'lg:w-2/3' : ''} flex flex-col gap-5`}>
            {/*  taglist  */}
            <div className="w-full">
              <TagBar tagList={articleOverviewInfo!.tags}/>
            </div>
            {/*  description  */}
            <a className="block w-full text-wrap cursor-pointer" onClick={handleNavigate}>
              {articleOverviewInfo!.description}
            </a>
            {/*  meta data  */}
            <div className="w-full flex justify-start items-center gap-3">
              {/*  category  */}
              <Typography fontSize="13px" color="#9CA3AF">{articleOverviewInfo!.category.name}</Typography>
              <div className="w-1 h-4 border-r-2 border-gray-300"/>
              <Typography fontSize="13px" color="#9CA3AF">
                last
                updated: {new Date(Number(articleOverviewInfo!.updateTimestamp)).toLocaleDateString('en-GB').split('/').reverse().join('-')}
              </Typography>
              <div className="w-1 h-4 border-r-2 border-gray-300"/>
              {/*  like comment view  */}
              <div className="flex justify-center items-center gap-4">
                <div className="flex justify-center items-center gap-1">
                  <VisibilityOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                  <Typography fontSize="13px" color="#9CA3AF">{articleOverviewInfo!.views}</Typography>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <CommentOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                  <Typography fontSize="13px" color="#9CA3AF">{articleOverviewInfo!.commentsCount}</Typography>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <ThumbUpOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                  <Typography fontSize="13px" color="#9CA3AF">{articleOverviewInfo!.likes}</Typography>
                </div>
              </div>
            </div>
          </div>
          {/*  right  */}
          {articleOverviewInfo!.coverImageLink && (
              <div className="hidden lg:w-1/3">
                <img src={articleOverviewInfo!.coverImageLink} alt="article cover"/>
              </div>
          )}
        </div>
      </div>
  );
};

export default ArticleOverviewListItem;
