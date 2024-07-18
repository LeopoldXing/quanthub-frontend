import ArticleOverviewListItem from "@/components/ArticleOverviewListItem.tsx";
import { Box, Divider, Skeleton } from "@mui/material";
import { ArticleOverviewInfo } from "@/types.ts";

type ArticleOverviewListProps = {
  articleOverviewInfoList?: Array<ArticleOverviewInfo>,
  loading?: boolean
}

const ArticleOverviewList = ({ articleOverviewInfoList, loading = false }: ArticleOverviewListProps) => {
  return (
      <>
        {(!loading && Array.isArray(articleOverviewInfoList)) ? (
            <ul style={{ minHeight: '70vh' }} className="w-full flex flex-col justify-start items-start gap-8">
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
            <ul style={{ minHeight: '70vh' }} className="w-full flex flex-col justify-start items-start gap-8">
              {Array.from({ length: 10 }, () => Math.floor(Math.random() * 10000) + 1).map((_, index) => (
                  <li key={_} className="w-full p-0 m-0">
                    <Box width={"100%"}>
                      {/* title */}
                      <div
                          className="w-full flex flex-col 2xl:flex-row justify-start items-start 2xl:justify-between 2xl:items-center gap-2 2xl:gap-0">
                        <Skeleton variant="text" width="60%" height={32}/>
                        {/* author & update time */}
                        <Skeleton variant="text" width={140} height={20}/>
                      </div>
                      {/* content */}
                      <div className="w-full mt-4 flex justify-between items-center gap-4">
                        {/* left */}
                        <div className={`w-full flex flex-col`}>
                          {/* taglist */}
                          <div className="w-full">
                            <Skeleton variant="rectangular" width="40%" height={20}/>
                          </div>
                          {/* description */}
                          <Skeleton variant="text" width="100%" height={80}/>
                          {/* meta data */}
                          <div className="w-full flex justify-start items-center gap-3">
                            <Skeleton variant="text" width={80} height={20}/>
                            <div className="w-1 h-4 border-r-2 border-gray-300"/>
                            <Skeleton variant="text" width={100} height={20}/>
                            <div className="w-1 h-4 border-r-2 border-gray-300"/>
                            {/* like comment view */}
                            <Skeleton variant="text" width={70} height={20}/>
                          </div>
                        </div>
                        {/* right */}
                        <div className="hidden lg:w-1/3">
                          <Skeleton variant="rectangular" width="100%" height={120}/>
                        </div>
                      </div>
                    </Box>
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
