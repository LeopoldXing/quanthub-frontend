import ArticleOverviewListItem from "@/components/ArticleOverviewListItem.tsx";
import { Divider } from "@mui/material";
import { ArticleOverviewInfo } from "@/types.ts";

type ArticleOverviewListProps = {
  articleOverviewInfoList: Array<ArticleOverviewInfo>
}

const ArticleOverviewList = ({ articleOverviewInfoList }: ArticleOverviewListProps) => {
  return (
      <ul className="w-full flex flex-col justify-start items-start gap-8">
        {Array.isArray(articleOverviewInfoList) && articleOverviewInfoList.length > 0 && (
            articleOverviewInfoList.map((articleInfo: ArticleOverviewInfo, index: number) => (
                <li key={articleInfo.id} className="w-full p-0 m-0">
                  <ArticleOverviewListItem articleOverviewInfo={articleInfo}/>
                  {index !== articleOverviewInfoList.length - 1 && (
                      <div className="mt-8"><Divider/></div>
                  )}
                </li>
            ))
        )}
      </ul>
  );
};

export default ArticleOverviewList;
