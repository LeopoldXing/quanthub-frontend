import ArticleModificationForm from "@/components/forms/ArticleModificationForm.tsx";

const ArticleCreationPage = () => {
  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="text-4xl font-bold">Create Article</div>
        <div className="mt-10">
          <ArticleModificationForm mode="create" initialData={{author: {username: "lll"}}}/>
        </div>
      </div>
  );
};

export default ArticleCreationPage;
