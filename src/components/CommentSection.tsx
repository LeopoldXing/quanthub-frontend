import { ArticleComment } from "@/types.ts";
import CommentInputBox from "@/components/CommentInputBox.tsx";
import CommentItem from "@/components/CommentItem.tsx";

type CommentSectionProps = {
  comments: ArticleComment[],
  onComment: (content: string) => Promise<void>,
}

const CommentSection = ({ comments, onComment }: CommentSectionProps) => {
  return (
      <div className="w-full">
        {/*  comment title  */}
        <div className="w-full text-lg text-black font-bold">{comments.length} Comments</div>
        {/*  comment input  */}
        <div className="mt-3">
          <CommentInputBox onSubmitted={onComment}/>
        </div>
        {/*  comment list  */}
        {Array.isArray(comments) && comments.length > 0 && (
            <ul className="w-full mt-6">
              {comments.map(comment => (
                  <li key={comment.id} className="w-full">
                    <CommentItem comment={comment}/>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default CommentSection;
