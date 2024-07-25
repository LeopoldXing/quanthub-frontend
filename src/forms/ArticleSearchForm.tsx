import { Controller, useForm } from "react-hook-form";
import { ArticleOverviewInfo, ArticleSearchParamType } from "@/types.ts";
import SearchBox from "@/components/SearchBox.tsx";
import SearchButton from "@/components/SearchButton.tsx";
import CategoryMultiSelectBox from "@/components/CategoryMultiSelectBox.tsx";
import { categories } from "@/lib/dummyData.ts";
import TagPool from "@/components/TagPool.tsx";
import SortingPanel from "@/components/SortingPanel.tsx";
import LoopIcon from "@mui/icons-material/Loop";
import { useGetMyTags, useShuffleTags } from "@/api/TagApi.ts";
import React, { useCallback, useEffect, useImperativeHandle, useState } from "react";
import AvailableTagPool from "@/components/AvailableTagPool.tsx";
import { SearchContentRequestProps, useSearchContent } from "@/api/ArticleApi.ts";
import ArticleOverviewList from "@/components/ArticleOverviewList.tsx";
import Pagination from "@mui/material/Pagination";
import { Box, Divider, Skeleton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export interface ArticleSearchFormInterface {
  changeType: (currentType: string) => void;
}

type ArticleSearchFormProps = {
  onSubmit: (data: ArticleSearchParamType) => void;
  viewerType: 'self' | 'public';
  type?: "article" | "announcement" | "draft";
}

const ArticleSearchForm = React.forwardRef(({
                                              onSubmit,
                                              viewerType = "public",
                                              type = "article"
                                            }: ArticleSearchFormProps, ref) => {
  const navigate = useNavigate();

  const { formState, control, handleSubmit, getValues, setValue } = useForm<ArticleSearchParamType>({
    defaultValues: {
      sort: {
        strategy: "recommended",
        direction: "none"
      },
      tagList: [],
      type: type
    }
  });

  /*  handle submit  */
  const { searchContent, isLoading: isSearching } = useSearchContent();
  const submit = useCallback(async (data: ArticleSearchParamType) => {
    onSubmit(data);
    const requestParam: SearchContentRequestProps = {
      ...data,
      sortStrategy: data.sort.strategy,
      sortDirection: data.sort.direction,
    }
    const overviewList = await searchContent(requestParam);
    setArticleOverviewList(overviewList);
  }, []);

  /*  search result  */
  const [articleOverviewList, setArticleOverviewList] = useState<Array<ArticleOverviewInfo>>([]);

  /*  tags  */
  // get some tags for selection
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const { shuffleTags, isLoading: isFetchingTags } = useShuffleTags();
  const handleRefreshTags = async () => {
    try {
      let res: string[];
      if (viewerType === 'public') {
        res = await shuffleTags(30);
      } else {
        res = await getMyTags(30);
      }
      setAvailableTags(res);
    } catch (error) {
      console.error(error);
    }
  }
  // get my tags
  const { getMyTags, isLoading: isGettingMyTags } = useGetMyTags();
  // spinning animation
  const [isSpinning, setIsSpinning] = useState(false);
  const [shouldCompleteSpin, setShouldCompleteSpin] = useState(false);
  useEffect(() => {
    if (isFetchingTags) {
      setIsSpinning(true);
      setShouldCompleteSpin(false);
    } else if (!isFetchingTags && isSpinning) {
      setShouldCompleteSpin(true);
      setTimeout(() => {
        setIsSpinning(false);
        setShouldCompleteSpin(false);
      }, 1000);
    }
  }, [isFetchingTags, isSpinning]);


  /*  fetch initial data  */
  const fetchTags = useCallback(async () => {
    try {
      let res: string[];
      if (viewerType === 'public') {
        res = await shuffleTags(30);
      } else {
        res = await getMyTags(30);
      }
      setAvailableTags(res);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    fetchTags();
    submit(getValues());
  }, [viewerType]);


  /*  interfaces expose to other component  */
  useImperativeHandle(ref, () => ({
    changeType(currentType: "article" | "announcement" | "draft") {
      setValue('type', currentType);
      handleSubmit(submit)();
    }
  }));

  return (
      <form className="w-full mx-auto pb-16 flex flex-col items-start justify-start" onSubmit={handleSubmit(submit)}>
        {/*  small screen  */}
        {/*  keyword  */}
        <div className="lg:hidden w-full">
          <Controller
              name="keyword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                  <div className="w-full h-12 mt-16 pb-1 flex justify-between items-center border-b border-gray-300">
                    <SearchBox {...field} viewerType={viewerType}/>
                    <SearchButton/>
                  </div>
              )}
          />
        </div>
        {/*  category  */}
        <div className="lg:hidden w-full mt-6 flex justify-end items-center">
          <Controller
              name="categoryList"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, onBlur, value } }) => (
                  <CategoryMultiSelectBox categoryList={categories.map(category => category.name)} onBlur={onBlur}
                                          value={value} onChange={event => {
                    onChange(event);
                    handleSubmit(submit);
                  }}/>
              )}
          />
        </div>
        {/*  tag pool  */}
        {getValues('tagList') && getValues('tagList').length > 0 && (
            <div className="lg:hidden w-full mt-6">
              <TagPool control={control} onChange={tags => setValue('tagList', tags)}
                       onDelete={() => handleSubmit(submit)()} onDeleteAll={() => handleSubmit(submit)()}/>
            </div>
        )}
        {/*  sorting  */}
        <div className="lg:hidden w-full mt-5">
          <Controller
              name="sort"
              control={control}
              render={({ field: { onChange, value } }) => (
                  <SortingPanel value={value} loading={formState.isSubmitting || formState.isLoading}
                                viewerType={viewerType} onChange={sort => {
                    onChange(sort);
                    handleSubmit(submit)();
                  }}/>
              )}
          />
        </div>

        {/*  large screen  */}
        <div className="w-full flex justify-between items-start gap-16">
          {/*  left  */}
          <div className="w-full lg:w-2/3">
            {/*  keyword  */}
            <Controller
                name="keyword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <div className="w-full h-12 mt-16 pb-1 flex justify-between items-center border-b border-gray-300">
                      <SearchBox {...field} viewerType={viewerType}/>
                      <SearchButton/>
                    </div>
                )}
            />
            {/*  tag pool  */}
            <div className="hidden lg:block w-full">
              <TagPool control={control} onChange={tags => setValue('tagList', tags)}
                       onDelete={() => handleSubmit(submit)()} onDeleteAll={() => {
                setValue('tagList', []);
                handleSubmit(submit)();
              }}/>
            </div>
            {/*  sorting  */}
            <div className="hidden mt-7 lg:block">
              <Controller
                  name="sort"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <SortingPanel value={value} loading={formState.isSubmitting || formState.isLoading}
                                    viewerType={viewerType} onChange={sort => {
                        onChange(sort);
                        handleSubmit(submit)();
                      }}/>
                  )}
              />
            </div>
            {/*  search result  */}
            <div className="w-full">
              {!isSearching ? (
                  articleOverviewList.length > 0 ? (
                      /*  we have the search result  */
                      <div style={{ minHeight: '70vh' }} className="w-full">
                        <div className="w-full py-10">
                          <ArticleOverviewList articleOverviewInfoList={articleOverviewList}/>
                        </div>
                        {Array.isArray(articleOverviewList) && articleOverviewList.length > 5 && (
                            <div className="w-full flex justify-center items-center">
                              <Pagination count={10} shape="rounded"/>
                            </div>
                        )}
                      </div>
                  ) : (
                      /*  we have the search result, but it's empty  */
                      <div style={{ minHeight: '70vh' }} className="w-full flex justify-center items-center">
                        {viewerType === "public" ? (
                            <Typography fontWeight="normal" fontSize="xl" textAlign="center" paddingTop="5%">
                              No Result Found!
                            </Typography>
                        ) : (
                            <div style={{ minHeight: '70vh' }} className="flex justify-center items-center gap-4">
                              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                                You don't have any articles,
                              </Typography>
                              <Button variant="text"
                                      sx={{ paddingY: "10px", marginLeft: "-15px", textTransform: "none" }}
                                      onClick={() => navigate("/article/create")}>
                                <Typography sx={{ fontSize: "16px", textWrap: "nowrap" }}>write something!</Typography>
                              </Button>
                            </div>
                        )}
                      </div>
                  )
              ) : (
                  /*  loading  */
                  <ul style={{ minHeight: '70vh' }}
                      className="w-full mt-8 flex flex-col justify-start items-start gap-8">
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
            </div>
          </div>
          {/*  right  */}
          <div className="hidden lg:block lg:w-1/3">
            {/*  category  */}
            <div className="hidden w-full mt-16 lg:flex justify-end items-center">
              <Controller
                  name="categoryList"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, onBlur, value } }) => (
                      <CategoryMultiSelectBox categoryList={categories.map(category => category.name)} onBlur={onBlur}
                                              value={value} onChange={event => {
                        onChange(event);
                        handleSubmit(submit)();
                      }}/>
                  )}
              />
            </div>
            {/*  tags  */}
            <div className="hidden lg:block mt-8">
              <div className="w-full mb-4 flex justify-between items-center">
                <div
                    className="text-start text-xl font-bold">{viewerType === "public" ? "Popular tags" : "My Tags"}</div>
                {viewerType === "public" && (
                    <button onClick={handleRefreshTags}
                            className={`${isSpinning ? 'spin' : ''} ${shouldCompleteSpin ? 'stop-spinning' : ''}`}>
                      <LoopIcon sx={{ height: "28px", width: "28px" }}/>
                    </button>
                )}
              </div>
              <Controller
                  name="tagList"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <div className="mt-8">
                        <AvailableTagPool isFetchingTags={isFetchingTags || isGettingMyTags} value={value}
                                          availableTagList={availableTags} control={control}
                                          onChange={tagList => {
                                            onChange(tagList);
                                            handleSubmit(submit)();
                                          }}/>
                      </div>
                  )}
              />
            </div>
          </div>
        </div>
      </form>
  );
});

export default ArticleSearchForm;
