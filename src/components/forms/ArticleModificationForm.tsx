import MuiRichTextEditor from "@/components/mui/RichTextEditor/MuiRichTextEditor.tsx";
import { MenuButtonBold, MenuButtonItalic, MenuControlsContainer, MenuDivider, MenuSelectHeading } from "mui-tiptap";
import EditorMenuControls from "@/components/mui/RichTextEditor/EditorMenuControls.tsx";

type ArticleModificationFormProps = {
  initialData: {
    title?: string;
    subtitle?: string;
    content?: string;
    author: {
      username: string;
    };
    metaData?: {
      likes: bigint;
      views: bigint;
      comments: Comment[];
    }
  };
  mode?: "create" | "update"
}

const ArticleModificationForm = ({ initialData, mode="create" }: ArticleModificationFormProps) => {
  return (
      <div className="w-full">
        <div className="w-full px-8 border-[1px] border-[#e0e0e0]">
          <MuiRichTextEditor
              renderControls={() => (
                  <MenuControlsContainer>
                    <EditorMenuControls/>
                  </MenuControlsContainer>
              )}
              initialContent={mode === "create" ? undefined : initialData.content}
          />
        </div>
      </div>
  );
};

export default ArticleModificationForm;
