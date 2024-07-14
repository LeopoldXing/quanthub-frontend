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
            <ul className="w-full mt-6 mb-16">
              {comments.map((comment, index) => (
                  <li key={comment.id} className={`w-full ${index !== 0 ? 'mt-8' : ''}`}>
                    <CommentItem comment={comment}/>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default CommentSection;
