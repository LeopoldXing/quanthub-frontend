import { CompleteArticleData } from "@/types.ts";
import RenderHtmlContent from "@/components/RenderHtmlContent.tsx";
import { fakeCompleteArticles } from "@/lib/dummyData.ts";

type ArticleProps = {
  articleData?: CompleteArticleData;
}

const Article = ({ articleData = fakeCompleteArticles[0] }: ArticleProps) => {
  return (
      <div className="w-full">
        {/*  title  */}
        <div className="w-full text-4xl font-bold">{articleData.title}</div>
        {/*  subtitle  */}
        {articleData.subtitle && (
            <div className="w-full mt-8 text-xl font-bold text-gray-600">{articleData.subtitle}</div>
        )}
        {/*  meta data  */}
        {/*<div className="w-full mt-8 flex justify-start items-center gap-3">
            category
          <Typography fontSize="13px" color="#9CA3AF">{articleData.category.name}</Typography>
          <div className="w-1 h-4 border-r-2 border-gray-300"/>
          <Typography fontSize="13px" color="#9CA3AF">
            last
            updated: {new Date(Number(articleData.updateTimestamp)).toLocaleDateString('en-GB').split('/').reverse().join('-')}
          </Typography>
          <div className="w-1 h-4 border-r-2 border-gray-300"/>
            like comment view
          <div className="flex justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-1">
              <VisibilityOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
              <Typography fontSize="13px" color="#9CA3AF">{articleData.views}</Typography>
            </div>
            <div className="flex justify-center items-center gap-1">
              <CommentOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
              <Typography fontSize="13px" color="#9CA3AF">{articleData.comments.length}</Typography>
            </div>
            <div className="flex justify-center items-center gap-1">
              <ThumbUpOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
              <Typography fontSize="13px" color="#9CA3AF">{articleData.likes}</Typography>
            </div>
          </div>
        </div>*/}
        {/*  content  */}
        <div className="w-full mt-10">
          <RenderHtmlContent contentHtml={articleData.contentHtml}/>
        </div>
      </div>
  );
};

export default Article;
