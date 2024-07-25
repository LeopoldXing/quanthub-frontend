import ArticleOverviewListItem from "@/components/ArticleOverviewListItem.tsx";
import { Divider } from "@mui/material";
import { ArticleOverviewInfo } from "@/types.ts";
import { useDeleteDraft } from "@/api/DraftApi.ts";
import { useState } from "react";

type ArticleOverviewListProps = {
  articleOverviewInfoList?: Array<ArticleOverviewInfo>,
}

const ArticleOverviewList = ({ articleOverviewInfoList }: ArticleOverviewListProps) => {
  const [overviewList, setOverviewList] = useState<ArticleOverviewInfo[]>(articleOverviewInfoList || []);

  /*  handle deleting draft  */
  const { deleteDraftById, isLoading } = useDeleteDraft();
  const handleDeleteDraft = async (id: string) => {
    await deleteDraftById(id);
    setOverviewList(prevState => prevState.filter((item) => item.id !== id));
  }

  return (
      <>
        {Array.isArray(overviewList) && overviewList.length > 0 && (
            <ul style={{ minHeight: '70vh' }} className="w-full flex flex-col justify-start items-start gap-8">
              {Array.isArray(overviewList) && overviewList.length > 0 && (
                  overviewList.map((articleInfo: ArticleOverviewInfo, index: number) => (
                      <li key={articleInfo.id} className="w-full p-0 m-0">
                        <ArticleOverviewListItem articleOverviewInfo={articleInfo} onDelete={handleDeleteDraft}
                                                 isDeleting={isLoading}/>
                        {index !== overviewList.length - 1 && (
                            <div className="mt-8"><Divider/></div>
                        )}
                      </li>
                  ))
              )}
            </ul>
        )}
      </>
  )
};

export default ArticleOverviewList;
