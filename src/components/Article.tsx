import { CompleteArticleData } from "@/types.ts";
import RenderHtmlContent from "@/components/RenderHtmlContent.tsx";
import TagBar from "@/components/TagBar.tsx";
import { IconButton, Typography, Link } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from "js-cookie";

type ArticleProps = {
  articleData: CompleteArticleData;
  isPreview?: boolean;
  likes?: number;
  views?: number;
  commentCount?: number;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const Article = ({
                   articleData,
                   likes = 0,
                   views = 1,
                   commentCount = 0,
                   isPreview = false,
                   onDelete,
                   onEdit,
                 }: ArticleProps) => {
  const cookie = Cookies.get("quanthub-user");
  let parsedCookie = null;
  if (cookie) {
    parsedCookie = JSON.parse(cookie);
  }

  return (
      <div className="w-full">
        {/*  title  */}
        <div className={`w-full ${!isPreview && 'flex justify-start items-center'}`}>
          <div className="text-4xl font-bold">{articleData.title}</div>
          {!isPreview && (parsedCookie?.user.role.toLowerCase() === 'admin' || parsedCookie?.user.id === articleData.author.id) && (
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
            <Typography fontSize="13px" color="#9CA3AF">{articleData?.category || "unknown"}</Typography>
            <div className="w-1 h-4 border-r-2 border-gray-300"/>
            <Typography fontSize="13px" color="#9CA3AF">
              last
              updated: {new Date(Number(articleData.updateTimestamp)).toLocaleDateString('en-GB').split('/').reverse().join('-')}
            </Typography>
            <div className="w-1 h-4 border-r-2 border-gray-300"/>
            {/*  like comment view  */}
            <div className="flex justify-center items-center gap-4">
              <div className="flex justify-center items-center gap-1">
                {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                {/*@ts-expect-error*/}
                <VisibilityOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                <Typography fontSize="13px" color="#9CA3AF">{views}</Typography>
              </div>
              <div className="flex justify-center items-center gap-1">
                {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                {/*@ts-expect-error*/}
                <CommentOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                <Typography fontSize="13px" color="#9CA3AF">{commentCount}</Typography>
              </div>
              <div className="flex justify-center items-center gap-1">
                {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                {/*@ts-expect-error*/}
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
        {/*  attachment  */}
        {articleData.attachmentName && articleData.attachmentLink && (
            <div className="ml-2 mt-8 flex justify-start items-center gap-1">
              <span className="text-nowrap">Attachment:</span>
              <Link href={articleData.attachmentLink} sx={{ display: "flex", alignItems: "center" }}>
                <AttachFileIcon/>
                <span>{articleData.attachmentName}</span>
              </Link>
            </div>
        )}
        {/*  tags  */}
        {articleData.tags && (
            <div>
              <TagBar tagList={articleData.tags} multiLine={true} size={"medium"} variant="filled" gap={4}/>
            </div>
        )}
      </div>
  );
};

export default Article;
