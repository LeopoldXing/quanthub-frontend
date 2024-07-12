import MuiRichTextEditor, { handleRichTextEditorData } from "@/components/mui/RichTextEditor/MuiRichTextEditor.tsx";
import { MenuControlsContainer } from "mui-tiptap";
import EditorMenuControls from "@/components/mui/RichTextEditor/EditorMenuControls.tsx";
import { exampleContent } from "@/lib/dummyData.ts";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface HandleArticleModificationFormSubmission {
  getFormData: (contentType: "text" | "json" | "html") => ArticleModificationFormData;
}

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
      comments: ArticleComment[];
    }
  };
  mode?: "create" | "update";
  onSaveDraft: (data: { contentText: string, contentHtml: string }) => void;
}

const ArticleModificationForm = forwardRef<HandleArticleModificationFormSubmission, ArticleModificationFormProps>(({
                                                                                                                     initialData,
                                                                                                                     mode = "create",
                                                                                                                     onSaveDraft
                                                                                                                   }, ref) => {
  // form data
  const [articleData, setArticleData] = useState<ArticleModificationFormData>({ title: "", content: "" });
  // text editor ref
  const textEditorRef = useRef<handleRichTextEditorData>(null);

  /*  send form data  */
  useImperativeHandle(ref, () => ({
    getFormData(contenType) {
      let content: string = "";
      if (textEditorRef.current) {
        if (contenType === "text") {
          content = textEditorRef.current.getText();
        } else if (contenType === "html") {
          content = textEditorRef.current.getHtml();
        } else if (contenType === "json") {
          content = textEditorRef.current.getJson() || "";
        }
      }
      return { ...articleData, content: content };
    }
  }));

  return (
      <Box width="100%" component="form" noValidate autoComplete="off">
        {/*  Title  */}
        <Box width="100%">
          <InputLabel htmlFor="title" size="small">Title</InputLabel>
          <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              name="title"
              size="small"
              onChange={e => setArticleData(prevState => ({ ...prevState, title: e.target.value }))}
              autoFocus
          />
          <InputLabel htmlFor="sub_title" size="small">Sub Title*</InputLabel>
          <TextField
              margin="normal"
              required
              fullWidth
              id="sub_title"
              name="subTitle"
              size="small"
              onChange={e => setArticleData(prevState => ({ ...prevState, subtitle: e.target.value }))}
          />
        </Box>
        {/*  Rich Text Editor  */}
        <div className="w-full px-8 mt-5 border-[1px] border-[#e0e0e0]">
          <MuiRichTextEditor
              renderControls={() => (
                  <MenuControlsContainer>
                    <EditorMenuControls/>
                  </MenuControlsContainer>
              )}
              initialContent={mode === "create" ? exampleContent : initialData.content}
              ref={textEditorRef}
              onSaveDraft={onSaveDraft}
          />
        </div>
      </Box>
  );
});

export default ArticleModificationForm;
