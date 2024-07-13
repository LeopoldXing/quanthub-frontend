import DOMPurify from 'dompurify';
import MuiRichTextEditor from "@/components/mui/RichTextEditor/MuiRichTextEditor.tsx";

type ArticleProps = {
  contentHtml: string;
};

const RenderHtmlContent = ({ contentHtml }: ArticleProps) => {
  const sanitizedHtml = DOMPurify.sanitize(contentHtml);

  return (
    <MuiRichTextEditor initialContent={sanitizedHtml} mode="display"/>
  );
};

export default RenderHtmlContent;
