import MuiRichTextEditor from "@/components/mui/RichTextEditor/MuiRichTextEditor.tsx";
import { MenuControlsContainer } from "mui-tiptap";
import EditorMenuControls from "@/components/mui/RichTextEditor/EditorMenuControls.tsx";
import { exampleContent } from "@/lib/dummyData.ts";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

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

const ArticleModificationForm = ({ initialData, mode = "create" }: ArticleModificationFormProps) => {
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
          />
        </div>
      </Box>
  );
};

export default ArticleModificationForm;
