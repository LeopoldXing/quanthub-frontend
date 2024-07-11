import ArticleModificationForm from "@/components/forms/ArticleModificationForm.tsx";
import Button from "@mui/material/Button";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { categories } from "@/lib/dummyData.ts";
import SingleCategorySelectBox from "@/components/mui/SingleCategorySelectBox.tsx";
import FileUploadButton from "@/components/mui/FileUploadButton.tsx";

const ArticleCreationPage = () => {
  /*  preview  */
  const handlePreviewButtonClick = () => {

  }

  /*  publish  */
  const handlePublishButtonClick = () => {

  }

  /*  save draft  */

  /*  handle file upload button click  */
  const handleFileUploadButtonClick = () => {

  }

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="w-full space-y-10 md:space-y-0 md:flex justify-between items-center">
          <div className="text-4xl font-bold">Create Article</div>
          <div className="flex flex-nowrap justify-start md:justify-center items-center gap-4">
            <Button variant="outlined" onClick={handlePreviewButtonClick}>Preview</Button>
            <Button variant="contained" onClick={handlePublishButtonClick}>Publish</Button>
          </div>
        </div>
        {/*  content  */}
        <div className="mt-10">
          <ArticleModificationForm mode="create" initialData={{ author: { username: "lll" } }}/>
        </div>
        {/*  tags and files and category  */}
        <div className="w-full mt-10 flex flex-col justify-start items-center gap-10">
          {/*  files and category  */}
          <div className="w-full hidden md:flex justify-between items-center gap-8">
            <div className="w-full min-h-24 flex flex-col justify-start items-start gap-4">
              <div className="text-nowrap text-xl font-bold">Category</div>
              <SingleCategorySelectBox categoryList={categories} onUpdate={() => {
              }}/>
            </div>
            <div className="w-full min-h-28 flex flex-col justify-start items-start gap-4">
              <div className="w-full">
                <span className="text-nowrap text-xl font-bold">Attachment</span>
                <span className="ml-3 text-nowrap text-sm font-light text-gray-400">(File size limit: 100MB)</span>
              </div>
              <button
                  className="w-full flex flex-1 justify-center items-center border border-dashed border-gray-300"
                  onClick={handleFileUploadButtonClick}>
                {/*<AttachFileIcon/>
                <span className="text-nowrap text-gray-600">File Upload</span>*/}
                <FileUploadButton/>
                <div/>
              </button>
            </div>
          </div>
          <div className="w-full md:hidden flex flex-col justify-start items-start gap-4">
            <div className="text-nowrap text-xl font-bold">Category</div>
            <SingleCategorySelectBox categoryList={categories} onUpdate={() => {
            }}/>
          </div>
          <div className="w-full min-h-28 md:hidden flex flex-col justify-start items-start gap-4">
            <div className="w-full">
              <span className="text-nowrap text-xl font-bold">Attachment</span>
              <span className="ml-3 text-nowrap text-sm font-light text-gray-400">(File size limit: 100MB)</span>
            </div>
            <button
                className="w-full flex flex-1 justify-center items-center gap-2 border border-dashed border-gray-300"
                onClick={handleFileUploadButtonClick}>
              <AttachFileIcon/>
              <span className="text-nowrap text-gray-600">File Upload</span>
            </button>
          </div>

          {/*  tags  */}
          <div>

          </div>
        </div>
      </div>
  );
};

export default ArticleCreationPage;
