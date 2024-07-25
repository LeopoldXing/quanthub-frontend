import TagBar from "@/components/TagBar.tsx";
import { Typography } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import { ArticleOverviewInfo } from "@/types.ts";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGetDraft } from "@/api/DraftApi.ts";
import LoadingButton from "@mui/lab/LoadingButton";

const ArticleOverviewListItem = ({ articleOverviewInfo, onDelete, isDeleting = false }: {
  articleOverviewInfo?: ArticleOverviewInfo,
  onDelete?: (id: string) => Promise<void>,
  isDeleting?: boolean
}) => {
  const navigate = useNavigate();

  const { getDraftById } = useGetDraft();
  const handleNavigate = async () => {
    if (articleOverviewInfo?.type !== 'draft') {
      navigate(`/article/detail/${articleOverviewInfo!.id}`);
    } else {
      const draftData = await getDraftById(articleOverviewInfo.id);
      console.log("要编辑草稿了 -> ");
      console.log(draftData);
      navigate(`/article/create`, {
        state: {
          articleData: draftData
        }
      })
    }
    window.scrollTo(0, 0);
  }

  /*  delete draft  */
  const handleDeleteDraft = async (id: string) => {
    onDelete && await onDelete(id);
  }

  return (
      <div className="w-full">
        {/*  title  */}
        <span onClick={articleOverviewInfo?.type !== 'draft' ? handleNavigate : () => {}}
              className={`w-full flex flex-col lg:flex-row justify-start items-start lg:justify-between lg:items-center gap-2 lg:gap-0 ${articleOverviewInfo?.type !== 'draft' ? 'cursor-pointer' : ''}`}>
          <div
              className="text-xl font-bold truncate max-w-md md:max-w-2xl lg:max-w-lg xl:max-w-lg 2xl:max-w-2xl">{articleOverviewInfo!.title}</div>
          {articleOverviewInfo?.type !== 'draft' ? (
              /*  author & update time  */
              <div className="flex justify-center items-center gap-1">
                <Typography fontSize="13px">{articleOverviewInfo!.author.username}</Typography>
                <Typography fontSize="20px">·</Typography>
                <Typography fontSize="13px">{articleOverviewInfo!.updateTillToday}</Typography>
              </div>
          ) : (
              <LoadingButton startIcon={<CloseIcon/>} loadingPosition="start" color="warning" loading={isDeleting}
                             size="small" onClick={() => handleDeleteDraft(articleOverviewInfo?.id)}>
                Delete
              </LoadingButton>
          )}
        </span>
        {/*  content  */}
        <div className="w-full mt-3 flex justify-between items-center gap-6">
          {/*  left  */}
          <div className={`w-full ${articleOverviewInfo!.coverImageLink ? 'lg:w-2/3' : ''} flex flex-col gap-5`}>
            {/*  taglist  */}
            <div className="w-full">
              <TagBar tagList={articleOverviewInfo!.tags}/>
            </div>
            {articleOverviewInfo?.type !== 'draft' ? (
                /*  description  */
                <a className="block w-full text-wrap cursor-pointer" onClick={handleNavigate}>
                  {articleOverviewInfo!.description}
                </a>
            ) : (
                /*  keep writing button  */
                <div className="relative w-full h-full">
                  <div className="w-full text-wrap rounded-lg filter blur-sm">
                    {articleOverviewInfo!.description}
                  </div>
                  <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Button variant="contained"
                            size="small"
                            sx={{ textWrap: "nowrap" }}
                            endIcon={<CreateIcon fontSize={'small'}/>}
                            onClick={handleNavigate}
                    >Keep Writing</Button>
                  </div>
                </div>
            )}
            {/*  meta data  */}
            <div className="w-full flex justify-start items-center gap-3">
              {/*  category  */}
              <Typography fontSize="13px" color="#9CA3AF">{articleOverviewInfo!.category}</Typography>
              <div className="w-1 h-4 border-r-2 border-gray-300"/>
              <Typography fontSize="13px" color="#9CA3AF">
                last
                updated: {new Date(Number(articleOverviewInfo!.updateTimestamp)).toLocaleDateString('en-GB').split('/').reverse().join('-')}
              </Typography>
              <div className="w-1 h-4 border-r-2 border-gray-300"/>
              {/*  like comment view  */}
              <div className="flex justify-center items-center gap-4">
                <div className="flex justify-center items-center gap-1">
                  {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                  {/*@ts-expect-error*/}
                  <VisibilityOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                  <Typography fontSize="13px" color="#9CA3AF">{articleOverviewInfo!.views}</Typography>
                </div>
                <div className="flex justify-center items-center gap-1">
                  {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                  {/*@ts-expect-error*/}
                  <CommentOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                  <Typography fontSize="13px" color="#9CA3AF">{articleOverviewInfo!.commentsCount}</Typography>
                </div>
                <div className="flex justify-center items-center gap-1">
                  {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                  {/*@ts-expect-error*/}
                  <ThumbUpOutlinedIcon fontSize="14px" sx={{ color: "#9CA3AF" }}/>
                  <Typography fontSize="13px" color="#9CA3AF">{articleOverviewInfo!.likes}</Typography>
                </div>
              </div>
            </div>
          </div>
          {/*  right  */}
          {articleOverviewInfo!.coverImageLink && (
              <div className="hidden lg:w-1/3">
                <img src={articleOverviewInfo!.coverImageLink} alt="article cover"/>
              </div>
          )}
        </div>
      </div>
  );
};

export default ArticleOverviewListItem;
