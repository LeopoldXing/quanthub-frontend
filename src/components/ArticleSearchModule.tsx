import SearchBox from "@/components/SearchBox.tsx";
import MultiCategorySelectBox from "@/components/mui/MultiCategorySelectBox.tsx";
import { categories } from "@/lib/dummyData.ts";
import SelectedTagPool from "@/components/SelectedTagPool.tsx";
import ArticleSortingPanel from "@/components/ArticleSortingPanel.tsx";
import ArticleOverviewList from "@/components/ArticleOverviewList.tsx";
import Pagination from "@mui/material/Pagination";
import { Typography } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import TagPoolForSearching, { HandleSelectedTagChange } from "@/components/TagPoolForSearching.tsx";
import { useEffect, useRef, useState } from "react";
import { ArticleOverviewInfo, ArticleSearchParamType, Category } from "@/types.ts";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useShuffleTags } from "@/api/TagApi.ts";
import { useSearchContent } from "@/api/ArticleApi.ts";

type ArticleSearchModuleProps = {
  mode?: "public" | "user" | "admin";
}

const ArticleSearchModule = ({ mode = "public" }: ArticleSearchModuleProps) => {
  // navigation
  const navigate = useNavigate();
  const [articleOverviewList, setArticleOverviewList] = useState<Array<ArticleOverviewInfo>>();

  /*  search params  */
  const [searchParams, setSearchParams] = useState<ArticleSearchParamType>({
    keyword: "",
    selectedCategoryList: [],
    selectedTagList: [],
    sortStrategy: "recommended",
    sortDirection: "none"
  })

  // keyword
  const handleKeywordChange = (keyword: string): void => {
    setSearchParams(prevState => {
      return { ...prevState, keyword: keyword }
    });
  }
  // category
  const handleCategoryChange = (updatedCategoryList: Array<Category>): void => {
    setSearchParams(prevState => ({
      ...prevState,
      selectedCategoryList: updatedCategoryList
    }));
  }

  // tags
  const [currentTagList, setCurrentTagList] = useState<string[]>();
  // tags - cancel
  const handleDeleteTag = (tag: string): void => {
    if (tag === "-1") {
      setSearchParams(prevState => {
        return { ...prevState, selectedTagList: [] }
      });
    } else {
      setSearchParams(prevState => {
        const newTagList = prevState.selectedTagList.filter(prevTag => prevTag !== tag);
        return { ...prevState, selectedTagList: newTagList };
      });
    }
  }
  // tags - select
  const handleSelectTag = (tag: string): void => {
    // if the selected tag is not in search param, then add the tag into the search param, otherwise do nothing
    if (searchParams.selectedTagList?.findIndex(selectedTag => selectedTag === tag) === -1) {
      setSearchParams({
        ...searchParams,
        selectedTagList: [...searchParams.selectedTagList, tag]
      });
    }
  }
  // tags - update TagPool
  const tagPoolRef = useRef<HandleSelectedTagChange>(null);
  useEffect(() => {
    if (tagPoolRef.current) {
      tagPoolRef.current.changeSelectedTags(searchParams.selectedTagList);
    }
  }, [searchParams.selectedTagList]);
  // tags - shuffle
  const { shuffleTags, isLoading: tagPoolLoading } = useShuffleTags();
  const handleRefreshTags = async (): Promise<void> => {
    try {
      const tags = await shuffleTags(30);
      setCurrentTagList(tags);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    handleRefreshTags();
  }, []);


  /*  sorting  */
  const handleSort = (sortStrategy: "publish_date" | "update_date" | "recommended", sortDirection: "asc" | "desc" | "none") => {
    setSearchParams(prevState => ({ ...prevState, sortDirection, sortStrategy }));
  }

  /*  get search result from backend  */
  /*  search  */
  const { searchContent, isLoading: isSearching } = useSearchContent();
  const handleSearch = async (): Promise<void> => {
    try {
      console.log("search in backend")
      console.log(searchParams)
      const res = await searchContent({
        keyword: searchParams.keyword,
        categoryList: searchParams.selectedCategoryList?.map(category => category.name),
        tagList: searchParams.selectedTagList,
        sortStrategy: searchParams.sortStrategy,
        sortDirection: searchParams.sortDirection,
        contentType: "article"
      });
      console.log("search result ->")
      console.log(res);
      setArticleOverviewList(res);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [searchParams.selectedTagList, searchParams.sortStrategy, searchParams.selectedCategoryList, searchParams.sortDirection]);

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  search bar  */}
        <div className="lg:hidden w-full">
          <SearchBox handleKeywordChange={handleKeywordChange} handleSearch={handleSearch}/>
        </div>

        {/*  category bar  */}
        <div className="lg:hidden w-full mt-6 flex justify-end items-center">
          <MultiCategorySelectBox categoryList={categories}
                                  onUpdate={handleCategoryChange}/>
        </div>

        {/*  selected tag area  */}
        <div className="lg:hidden w-full mt-6">
          <SelectedTagPool selectedTagList={searchParams.selectedTagList}
                           handleDeleteTag={handleDeleteTag}/>
        </div>

        {/*  sorting panel  */}
        <div className="lg:hidden w-full mt-5">
          <ArticleSortingPanel onSort={handleSort} loading={isSearching}/>
        </div>

        {/*  content container  */}
        <div className="w-full flex justify-between items-start gap-16">
          {/*  left  */}
          <div className="w-full lg:w-2/3">
            <div className="hidden lg:block w-full">
              <SearchBox handleKeywordChange={handleKeywordChange} handleSearch={handleSearch}/>
            </div>
            {/*  selected tag area  */}
            <div className="hidden lg:block w-full mt-6">
              <SelectedTagPool selectedTagList={searchParams.selectedTagList}
                               handleDeleteTag={handleDeleteTag}/>
            </div>

            {/*  sorting panel  */}
            <div className="hidden mt-7 lg:block">
              <ArticleSortingPanel onSort={handleSort} mode={mode} loading={isSearching}/>
            </div>

            {/*  search result  */}
            {(isSearching || (Array.isArray(articleOverviewList) && articleOverviewList.length > 0)) && (
                <div className="w-full">
                  <div className="w-full py-10">
                    <ArticleOverviewList articleOverviewInfoList={articleOverviewList} loading={isSearching}/>
                  </div>
                  {Array.isArray(articleOverviewList) && articleOverviewList.length > 5 && (
                      <div className="w-full flex justify-center items-center">
                        <Pagination count={10} shape="rounded"/>
                      </div>
                  )}
                </div>
            )}
            {(!isSearching && articleOverviewList && Array.isArray(articleOverviewList) && articleOverviewList.length === 0) && (
                <div className="w-full flex justify-center items-center">
                  {mode === "public" ? (
                      <Typography fontWeight="normal" fontSize="xl" textAlign="center" paddingTop="5%">
                        No Result Found!
                      </Typography>
                  ) : (
                      <div className="flex justify-center items-center gap-4">
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                          You don't have any articles,
                        </Typography>
                        <Button variant="text" sx={{ paddingY: "10px", marginLeft: "-15px", textTransform: "none" }}
                                onClick={() => navigate("/article/create")}>
                          <Typography sx={{ fontSize: "16px", textWrap: "nowrap" }}>write something!</Typography>
                        </Button>
                      </div>
                  )}
                </div>
            )}
          </div>
          {/*  right extra info  */}
          <div className="hidden lg:block lg:w-1/3">
            {/*  category bar  */}
            <div className="hidden w-full mt-16 lg:flex justify-end items-center">
              <MultiCategorySelectBox categoryList={categories}
                                      onUpdate={handleCategoryChange}/>
            </div>
            {/*  tag pool  */}
            <div className="hidden lg:block mt-8">
              <div className="w-full mb-4 flex justify-between items-center">
                <div className="text-start text-xl font-bold">{mode === "public" ? "Popular tags" : "My Tags"}</div>
                <button onClick={() => {
                  handleRefreshTags();
                }} className={`${tagPoolLoading ? 'spin-once' : ''} ${mode === "public" ? "" : "hidden"}`}>
                  <LoopIcon sx={{ height: "28px", width: "28px" }}/>
                </button>
              </div>
              <div className="mt-8">
                <TagPoolForSearching tagList={currentTagList} onSelect={handleSelectTag}
                                     ref={tagPoolRef}
                                     loading={tagPoolLoading}/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ArticleSearchModule;
