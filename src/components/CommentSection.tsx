import CommentInputBox from "@/components/CommentInputBox.tsx";
import CommentItem from "@/components/CommentItem.tsx";
import { ArticleComment } from "@/types.ts";

type CommentSectionProps = {
  comments: ArticleComment[],
  onComment: (content: string) => Promise<void>,
  onDelete: (comment: ArticleComment) => Promise<void>,
  onUpdate: (comment: ArticleComment) => Promise<void>
};

const CommentSection = ({ comments, onComment, onDelete, onUpdate }: CommentSectionProps) => {
  return (
      <div className="w-full">
        <div className="w-full text-lg text-black font-bold">{comments.length} Comments</div>
        <div className="mt-3">
          <CommentInputBox onSubmit={onComment}/>
        </div>
        {Array.isArray(comments) && comments.length > 0 && (
            <ul className="w-full mt-6 mb-16">
              {comments.map((comment, index) => (
                  <li key={comment.id} className={`w-full ${index !== 0 ? 'mt-8' : ''}`}>
                    <CommentItem comment={comment} onDelete={onDelete} onEdit={onUpdate}/>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default CommentSection;
