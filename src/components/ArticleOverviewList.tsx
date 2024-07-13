import ArticleOverviewListItem from "@/components/ArticleOverviewListItem.tsx";
import { Divider } from "@mui/material";
import { ArticleOverviewInfo } from "@/types.ts";

type ArticleOverviewListProps = {
  articleOverviewInfoList?: Array<ArticleOverviewInfo>,
  loading?: boolean
}

const ArticleOverviewList = ({ articleOverviewInfoList, loading = false }: ArticleOverviewListProps) => {
  return (
      <>
        {(!loading && Array.isArray(articleOverviewInfoList)) ? (
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
        ) : (
            <ul className="w-full flex flex-col justify-start items-start gap-8">
              {Array.from({ length: 10 }, () => Math.floor(Math.random() * 10000) + 1).map((_, index) => (
                  <li key={_} className="w-full p-0 m-0">
                    <ArticleOverviewListItem loading={true}/>
                    {index !== 9 && (
                        <div className="mt-8"><Divider/></div>
                    )}
                  </li>
              ))}
            </ul>
        )}
      </>
  );
};

export default ArticleOverviewList;
