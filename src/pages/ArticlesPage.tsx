import Button from "@mui/material/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import ArticleIcon from '@mui/icons-material/Article';
import PublicIcon from '@mui/icons-material/Public';
import { debounce, Typography } from "@mui/material";
import SearchBox from "@/components/SearchBox.tsx";
import MultiCategorySelectBox from "@/components/mui/MultiCategorySelectBox.tsx";
import SelectedTagPool from "@/components/SelectedTagPool.tsx";
import ArticleSortingPanel from "@/components/ArticleSortingPanel.tsx";
import TagPoolForSearching, { HandleSelectedTagChange } from "@/components/TagPoolForSearching.tsx";
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from '@mui/icons-material/Add';
import { categories, fakeArticleOverviewList, tags } from "@/lib/dummyData.ts";
import "@/global.css";
import ArticleOverviewList from "@/components/ArticleOverviewList.tsx";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { ArticleOverviewInfo, Category, Tag } from "@/types.ts";

type SearchParamType = {
  keyword: string;
  selectedCategoryList: Array<Category>;
  selectedTagList: Array<Tag>;
  sortStrategy: "publish_date" | "update_date" | "recommended";
  sortDirection: "asc" | "desc" | "none";
}

const ArticlesPage = () => {
  const navigate = useNavigate();

  /*  section  */
  const [isAnnouncementSection, setIsAnnouncementSection] = useState<boolean>(false);
  const handleSectionClick = (section: string) => {
    setIsAnnouncementSection(section === "announcement");
  }

  /*  search  */
  const handleSearch = (): void => {
    console.log("search in backend")
    console.log(searchParams)
  }
  const debouncedSearch = useCallback(debounce(() => {
    handleSearch();
  }, 200), [handleSearch])
  const [searchParams, setSearchParams] = useState<SearchParamType>({
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


  /*  create new article  */
  const handleCreateArticleButtonClick = () => {
    navigate("/article/create");
  }

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="w-full flex justify-between items-center">
          <div
              className="w-full flex flex-col justify-start items-center lg:flex-row lg:justify-start lg:items-end lg:gap-16">
            <div className="text-4xl font-bold">Blogs</div>
            {/*  buttons  */}
            <div className="mt-8 lg:mt-0">
              <Button variant="text" onClick={() => handleSectionClick("article")} size="small" sx={{
                mr: "40px",
                flex: "flex",
                alignItems: "center",
                color: `${isAnnouncementSection ? "#000000" : "#27ae60"}`
              }}>
                <ArticleIcon sx={{ mr: "5px" }}/>
                <Typography sx={{ fontSize: "14px" }} fontWeight={isAnnouncementSection ? "" : "bold"}>
                  Articles
                </Typography>
              </Button>
              <Button variant="text" onClick={() => handleSectionClick("announcement")} size="small" sx={{
                flex: "flex",
                alignItems: "center",
                color: `${isAnnouncementSection ? "#27ae60" : "#000000"}`
              }}>
                <PublicIcon sx={{ mr: "5px" }}/>
                <Typography sx={{ fontSize: "14px" }} fontWeight={isAnnouncementSection ? "bold" : ""}>
                  Announcements
                </Typography>
              </Button>
            </div>
          </div>
          {/*  add article  */}
          <div className="hidden lg:block w-52">
            <Button variant="contained" sx={{ paddingY: "10px", textWrap: "nowrap", fontSize: "small" }}
                    onClick={handleCreateArticleButtonClick}>
              <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
              <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
            </Button>
          </div>
        </div>

        {/*  add article  */}
        <div className="lg:hidden w-full mt-10 flex justify-end items-center">
          <Button sx={{ textWrap: "nowrap", fontSize: "small" }} onClick={handleCreateArticleButtonClick}>
            <AddIcon sx={{ mr: "5px" }} fontSize="small"/>
            <Typography sx={{ fontSize: "14px" }}>Write something</Typography>
          </Button>
        </div>

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
              <ArticleSortingPanel onSort={handleSort}/>
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
                  <Typography fontWeight="normal" fontSize="xl" textAlign="center" paddingTop="5%">
                    No Result Found!
                  </Typography>
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
                <div className="text-start text-xl font-bold">Popular tags</div>
                <button onClick={() => {
                  handleRefreshIconSpin();
                  handleRefreshTags();
                }} className={isSpinning ? 'spin-once' : ''}>
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

export default ArticlesPage;
