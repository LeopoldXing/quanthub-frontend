import { CompleteArticleData } from "@/types.ts";
import RenderHtmlContent from "@/components/RenderHtmlContent.tsx";
import { fakeCompleteArticles } from "@/lib/dummyData.ts";
import TagBar from "@/components/TagBar.tsx";
import { IconButton, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type ArticleProps = {
  articleData?: CompleteArticleData;
  isPreview?: boolean;
  likes?: number;
  views?: number;
  commentCount?: number;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const Article = ({
                   articleData = fakeCompleteArticles[0],
                   likes = 0,
                   views = 1,
                   commentCount = 0,
                   isPreview = false,
                   onDelete,
                   onEdit,
                 }: ArticleProps) => {
  return (
      <div className="w-full">
        {/*  title  */}
        <div className={`w-full ${!isPreview && 'flex justify-start items-center'}`}>
          <div className="text-4xl font-bold">{articleData.title}</div>
          {!isPreview && (
              <div className="ml-4 flex justify-start items-center gap-4">
                <IconButton onClick={() => onEdit && onEdit(articleData.id)}>
                  <EditIcon/>
                </IconButton>
                <IconButton onClick={() => onDelete && onDelete(articleData.id)}>
                  <DeleteIcon/>
                </IconButton>
              </div>
          )}
        </div>
        {/*  subtitle  */}
        {articleData.subtitle && (
            <div className="w-full mt-8 text-xl font-bold text-gray-600">{articleData.subtitle}</div>
        )}
        {/*  meta data  */}
        <div className="w-full mt-8">
          {/*  author  */}
          <div className="w-full flex justify-start items-center gap-1">
            <Typography fontSize="13px" color="#9CA3AF">{articleData.author.username}</Typography>
            <Typography fontSize="20px" color="#9CA3AF">·</Typography>
            <Typography fontSize="13px" color="#9CA3AF">{articleData.updateTillToday}</Typography>
          </div>
          <div className="w-full mt-1 flex justify-start items-center gap-3">
            {/*  category  */}
            <Typography fontSize="13px" color="#9CA3AF">{articleData.category?.name || "unknown"}</Typography>
            <div className="w-1 h-4 border-r-2 border-gray-300"/>
            <Typography fontSize="13px" color="#9CA3AF">
              last
              updated: {new Date(Number(articleData.updateTimestamp)).toLocaleDateString('en-GB').split('/').reverse().join('-')}
            </Typography>
            <div className="w-1 h-4 border-r-2 border-gray-300"/>
            {/*  like comment view  */}
            <div className="flex justify-center items-center gap-4">
              <div className="flex justify-center items-center gap-1">
                <VisibilityOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                <Typography fontSize="13px" color="#9CA3AF">{views}</Typography>
              </div>
              <div className="flex justify-center items-center gap-1">
                <CommentOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                <Typography fontSize="13px" color="#9CA3AF">{commentCount}</Typography>
              </div>
              <div className="flex justify-center items-center gap-1">
                <ThumbUpOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                <Typography fontSize="13px" color="#9CA3AF">{likes}</Typography>
              </div>
            </div>
          </div>
        </div>
        {/*  content  */}
        <div className="w-full mt-10">
          <RenderHtmlContent contentHtml={articleData.contentHtml}/>
        </div>
        {/*  tags  */}
        {articleData.tags && (
            <div className="mt-8">
              <TagBar tagList={articleData.tags} multiLine={true} size={"medium"} variant="filled" gap={4}/>
            </div>
        )}
      </div>
  );
};

export default Article;
