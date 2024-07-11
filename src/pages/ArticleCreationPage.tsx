import ArticleModificationForm from "@/components/forms/ArticleModificationForm.tsx";
import Button from "@mui/material/Button";

const ArticleCreationPage = () => {
  /*  preview  */
  const handlePreviewButtonClick = () => {

  }

  /*  publish  */
  const handlePublishButtonClick = () => {

  }

  /*  save draft  */

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="w-full space-y-8 md:space-y-0 md:flex justify-between items-center">
          <div className="text-4xl font-bold">Create Article</div>
          <div className="flex flex-nowrap justify-start md:justify-center items-center gap-4">
            <Button variant="outlined" onClick={handlePreviewButtonClick}>Preview</Button>
            <Button variant="contained" onClick={handlePublishButtonClick}>Publish</Button>
          </div>
        </div>
        <div className="mt-10">
          <ArticleModificationForm mode="create" initialData={{author: {username: "lll"}}}/>
        </div>
      </div>
  );
};

export default ArticleCreationPage;
