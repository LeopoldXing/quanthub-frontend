import Button from "@mui/material/Button";
import { useCallback, useEffect, useState } from "react";
import ArticleIcon from '@mui/icons-material/Article';
import PublicIcon from '@mui/icons-material/Public';
import { debounce, Typography } from "@mui/material";
import SearchBox from "@/components/SearchBox.tsx";
import CategorySelectBox from "@/components/mui/CategorySelectBox.tsx";
import SelectedTagPool from "@/components/SelectedTagPool.tsx";
import ArticleSortingPanel from "@/components/ArticleSortingPanel.tsx";
import TagPool from "@/components/TagPool.tsx";
import LoopIcon from '@mui/icons-material/Loop';

type SearchParamType = {
  keyword: string;
  selectedCategoryList: Array<Category>;
  selectedTagList: Array<Tag>;
  sortStrategy: "publish_date" | "update_date" | "recommended";
  sortDirection: "asc" | "desc" | "none";
}

const ArticlesPage = () => {
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
  const handleCategoryChange = (updatedCategoryList: Array<Category>) => {
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
    console.log(tag);
  }


  /*  sorting  */
  const handleSort = (sortStrategy: "publish_date" | "update_date" | "recommended", sortDirection: "asc" | "desc" | "none") => {
    console.log("sortStrategy", sortStrategy);
    console.log("sortDirection", sortDirection);
  }

  /*  get search result from backend  */
  const [articleOverviewList, setArticleOverviewList] = useState<Array<string>>([])
  useEffect(() => {
    debouncedSearch()
  }, [searchParams.selectedCategoryList, searchParams.selectedCategoryList]);

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="w-full flex flex-col justify-start items-center lg:flex-row lg:justify-start lg:items-end lg:gap-16">
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

        {/*  search bar  */}
        <div className="lg:hidden w-full">
          <SearchBox handleKeywordChange={handleKeywordChange} handleSearch={handleSearch}/>
        </div>

        {/*  category bar  */}
        <div className="lg:hidden w-full mt-6 flex justify-end items-center">
          <CategorySelectBox categoryList={[{ id: "1", name: "quant" }, { id: "2", name: "kmt model" }]}
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
          <div className="w-2/3">
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
            <div>
              {articleOverviewList.length > 0 ? (
                  articleOverviewList.map(article => (
                      <div>
                        {article}
                      </div>
                  ))
              ) : (
                  <div className="w-full flex justify-center items-center" style={{ height: "70vh" }}>
                    <Typography fontWeight="normal" fontSize="xl" textAlign="center" paddingTop="5%">
                      No Result Found!
                    </Typography>
                  </div>
              )}
            </div>
          </div>
          {/*  right extra info  */}
          <div className="w-1/3">
            {/*  category bar  */}
            <div className="hidden w-full mt-16 lg:flex justify-end items-center">
              <CategorySelectBox categoryList={[{ id: "1", name: "quant" }, { id: "2", name: "kmt model" }]}
                                 onUpdate={handleCategoryChange}/>
            </div>
            {/*  tag pool  */}
            <div className="hidden lg:block w-full mt-8">
              <div className="w-full mb-4 flex justify-between items-center">
                <div className="text-start text-xl font-bold">Popular tags</div>
                <button><LoopIcon/></button>
              </div>
              <TagPool tagList={[{ id: "1", name: "quant" }, { id: "2", name: "kmt model" }]}
                       onSelect={handleSelectTag}/>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ArticlesPage;
