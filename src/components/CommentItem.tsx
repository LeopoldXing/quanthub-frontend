import { ArticleComment } from "@/types.ts";
import { Avatar } from "@mui/material";
import defaultAvatar from "@/assets/default_avarta.png";
import MoreVertIcon from '@mui/icons-material/MoreVert';

type CommentItemProps = {
  comment: ArticleComment
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
      <div className="w-full flex flex-wrap justify-between items-start">
        <Avatar alt={comment.user.username} src={comment.user.avatarLink || defaultAvatar}
                sx={{ height: "40px", width: "40px" }}/>
        <div className="w-0 flex-grow ml-5 flex flex-col justify-start items-start">
          <div className="w-full flex justify-between">
            <div className="max-w-full flex justify-start items-center gap-2">
              {/*  username  */}
              <span className="text-xs">@{comment.user.username}</span>
              {/*  publish date  */}
              <span className="text-xs text-[#606060]">{comment.publishTillToday}</span>
            </div>
          </div>
          {/*  content  */}
          <span className="max-w-full mt-1 pr-5 text-sm break-words">{comment.content}</span>
        </div>
        {/*  more  */}
        <MoreVertIcon fontSize="small" fontWeight="light"/>
      </div>
  );
};

export default CommentItem;
