import MuiRichTextEditor from "@/components/mui/RichTextEditor/MuiRichTextEditor.tsx";

const ArticleCreationPage = () => {
  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="text-4xl font-bold">Create Article</div>
        <div>
          <MuiRichTextEditor/>
        </div>
      </div>
  );
};

export default ArticleCreationPage;
