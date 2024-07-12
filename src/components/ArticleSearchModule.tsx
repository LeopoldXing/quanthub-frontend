import SearchBox from "@/components/SearchBox.tsx";
import MultiCategorySelectBox from "@/components/mui/MultiCategorySelectBox.tsx";
import { categories, fakeArticleOverviewList, tags } from "@/lib/dummyData.ts";
import SelectedTagPool from "@/components/SelectedTagPool.tsx";
import ArticleSortingPanel from "@/components/ArticleSortingPanel.tsx";
import ArticleOverviewList from "@/components/ArticleOverviewList.tsx";
import Pagination from "@mui/material/Pagination";
import { debounce, Typography } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import TagPoolForSearching, { HandleSelectedTagChange } from "@/components/TagPoolForSearching.tsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArticleOverviewInfo, ArticleSearchParamType, Category, Tag } from "@/types.ts";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

type ArticleSearchModuleProps = {
  mode?: "public" | "user" | "admin";
}

const ArticleSearchModule = ({ mode = "public" }: ArticleSearchModuleProps) => {
  // navigation
  const navigate = useNavigate();

  /*  search  */
  const handleSearch = (): void => {
    console.log("search in backend")
    console.log(searchParams)
  }
  const debouncedSearch = useCallback(debounce(() => {
    handleSearch();
  }, 200), [handleSearch])
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
  // tags - cancel
  const handleDeleteTag = (id: string): void => {
    if (id === "all") {
      setSearchParams(prevState => {
        return { ...prevState, selectedTagList: [] }
      });
    } else {
      setSearchParams(prevState => {
        const newTagList = prevState.selectedTagList.filter(tag => tag.id !== id);
        return { ...prevState, selectedTagList: newTagList };
      });
    }
  }
  // tags - select
  const handleSelectTag = (tag: Tag): void => {
    setSearchParams(prevState => {
      const prevTagList = prevState.selectedTagList;
      if (prevTagList.findIndex(prevTag => prevTag.id === tag.id) === -1) {
        prevTagList.push(tag);
      }
      return { ...prevState, selectedTagList: prevTagList };
    })
  }
  // tags - update TagPool
  const tagPoolRef = useRef<HandleSelectedTagChange>(null);
  useEffect(() => {
    if (tagPoolRef.current) {
      tagPoolRef.current.changeSelectedTags(searchParams.selectedTagList);
    }
  }, [searchParams.selectedTagList]);
  // tags - shuffle
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const handleRefreshIconSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 500); // animation will last 0.5s
  };
  const [currentTagList, setCurrentTagList] = useState<Array<Tag>>(tags);
  const handleRefreshTags = (): void => {
    console.log("shuffle tag list");
  }


  /*  sorting  */
  const handleSort = (sortStrategy: "publish_date" | "update_date" | "recommended", sortDirection: "asc" | "desc" | "none") => {
    console.log("sortStrategy", sortStrategy);
    console.log("sortDirection", sortDirection);
  }

  /*  get search result from backend  */
  const [articleOverviewList, setArticleOverviewList] = useState<Array<ArticleOverviewInfo>>([])
  useEffect(() => {
    debouncedSearch();
    setArticleOverviewList(fakeArticleOverviewList);
  }, [searchParams.selectedCategoryList, searchParams.selectedCategoryList]);

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
          <SelectedTagPool selectedTagList={searchParams.selectedTagList} handleDeleteTag={handleDeleteTag}/>
        </div>

        {/*  sorting panel  */}
        <div className="lg:hidden w-full mt-5">
          <ArticleSortingPanel onSort={handleSort}/>
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
              <SelectedTagPool selectedTagList={searchParams.selectedTagList} handleDeleteTag={handleDeleteTag}/>
            </div>

            {/*  sorting panel  */}
            <div className="hidden mt-7 lg:block">
              <ArticleSortingPanel onSort={handleSort} mode={mode}/>
            </div>

            {/*  search result  */}
            {articleOverviewList.length > 0 ? (
                <div className="w-full">
                  <div className="w-full py-10">
                    <ArticleOverviewList articleOverviewInfoList={articleOverviewList}/>
                  </div>
                  {articleOverviewList.length > 5 && (
                      <div className="w-full flex justify-center items-center">
                        <Pagination count={10} shape="rounded"/>
                      </div>
                  )}
                </div>
            ) : (
                <div className="w-full flex justify-center items-center" style={{ height: "70vh" }}>
                  {mode === "public" ? (
                      <Typography fontWeight="normal" fontSize="xl" textAlign="center" paddingTop="5%">
                        No Result Found!
                      </Typography>
                  ) : (
                      <div className="flex justify-center items-center gap-4">
                        <Typography sx={{fontSize: "16px", fontWeight: "bold"}}>You don't have any articles, </Typography>
                        <Button variant="text" sx={{ paddingY: "10px", marginLeft: "-15px", textTransform: "none" }}
                                onClick={() => navigate("/article/create")}>
                          <Typography sx={{ fontSize: "16px", textWrap: "nowrap"}}>write something now!</Typography>
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
                  handleRefreshIconSpin();
                  handleRefreshTags();
                }} className={`${isSpinning ? 'spin-once' : ''} ${mode === "public" ? "" : "hidden"}`}>
                  <LoopIcon sx={{ height: "28px", width: "28px" }}/>
                </button>
              </div>
              <div className="mt-8">
                <TagPoolForSearching tagList={currentTagList} onSelect={handleSelectTag} ref={tagPoolRef}/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ArticleSearchModule;
