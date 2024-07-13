import MuiRichTextEditor, { handleRichTextEditorData } from "@/components/mui/RichTextEditor/MuiRichTextEditor.tsx";
import { MenuControlsContainer } from "mui-tiptap";
import EditorMenuControls from "@/components/mui/RichTextEditor/EditorMenuControls.tsx";
import { categories, exampleContentHtml, exampleContentJson, tags } from "@/lib/dummyData.ts";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ArticleComment, Category } from "@/types.ts";
import {
  articleModificationFormSchema,
  ArticleModificationFormZodDataType
} from "@/components/forms/schemas/ArticleModificationFormSchema.ts";
import SingleCategorySelectBox from "@/components/mui/SingleCategorySelectBox.tsx";
import FileUploadButton from "@/components/mui/FileUploadButton.tsx";
import TagPoolForArticleModification, { HandleSelectedTagData } from "@/components/TagPoolForArticleModification.tsx";

export interface HandleArticleModificationFormSubmission {
  getArticleContent: (contentType: "text" | "json" | "html" | "html&text") => ArticleModificationFormZodDataType;
  submit: () => ArticleModificationFormZodDataType | undefined;
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
  onSaveDraft: () => void;
  onCancel: () => void;
  isSavingDraft?: boolean;
  onFormDataChange?: (data: ArticleModificationFormZodDataType) => void;
}

const ArticleModificationForm = forwardRef<HandleArticleModificationFormSubmission, ArticleModificationFormProps>(({
                                                                                                                     initialData,
                                                                                                                     mode = "create",
                                                                                                                     onSaveDraft,
                                                                                                                     onCancel,
                                                                                                                     isSavingDraft = false,
                                                                                                                     onFormDataChange
                                                                                                                   }, ref) => {
  // form data
  const [formData, setFormData] = useState<ArticleModificationFormZodDataType>({
    title: "",
    subtitle: null,
    contentHtml: exampleContentHtml,
    contentText: "",
    contextJson: JSON.stringify(exampleContentJson),
    categoryName: "unknown",
    pictureLinkList: [],
    attachmentLink: null,
    tagNameList: []
  });
  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(formData);
    }
  }, [formData, onFormDataChange]);
  // text editor ref
  const textEditorRef = useRef<handleRichTextEditorData>(null);
  // tag pool ref
  const tagPoolRef = useRef<HandleSelectedTagData>(null);
  // get article content
  const fetchArticleContent = (contentType: "text" | "json" | "html" | "html&text") => {
    let contentText: string = "";
    let contentHtml: string = "";
    let contentJson: string = "";
    if (textEditorRef.current) {
      if (contentType === "html&text") {
        contentText = textEditorRef.current.getText();
        contentHtml = textEditorRef.current.getHtml();
      } else if (contentType === "text") {
        contentText = textEditorRef.current.getText();
      } else if (contentType === "html") {
        contentHtml = textEditorRef.current.getHtml();
      } else if (contentType === "json") {
        contentJson = JSON.parse(textEditorRef.current.getJson()) || "";
      }
    }
    return { contentText, contentHtml, contentJson };
  }
  // validate form data
  const [errors, setErrors] = useState<{ [key in keyof ArticleModificationFormZodDataType]?: string }>({});
  const validateFormData = (data: ArticleModificationFormZodDataType): boolean => {
    const result = articleModificationFormSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        subtitle: fieldErrors.subtitle?.[0],
        contentHtml: fieldErrors.contentHtml?.[0],
      });
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  /*  interfaces expose to other component  */
  useImperativeHandle(ref, () => ({
    getArticleContent(contentType) {
      return { ...formData, ...fetchArticleContent(contentType) };
    },
    submit() {
      // get selected tags
      const selectedTagList = tagPoolRef.current?.getSelectedTagList();
      setFormData(prevState => ({
        ...prevState,
        tagNameList: selectedTagList?.map(selectedTag => selectedTag.name) || null
      }))
      if (validateFormData(formData)) {
        return formData;
      }
      return undefined;
    }
  }));

  /*  handle file upload button click  */
  const handleFileUpload = () => {
    console.log("文件上传");
    console.log(formData);
  }

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
              error={!!errors.title}
              helperText={errors.title}
              onChange={e => setFormData(prevState => ({ ...prevState, title: e.target.value }))}
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
              error={!!errors.subtitle}
              helperText={errors.subtitle}
              onChange={e => setFormData(prevState => ({ ...prevState, subtitle: e.target.value }))}
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
              initialContent={mode === "create" ? exampleContentHtml : initialData.content}
              ref={textEditorRef}
              onSaveDraft={onSaveDraft}
              onCancel={onCancel}
              onUpdate={(content) => {
                setFormData(prevState => ({
                  ...prevState,
                  contentText: content.contentText,
                  contentHtml: content.contentHtml,
                  contextJson: content.contentJson
                }))
              }}
              isSavingDraft={isSavingDraft}
          />
        </div>


        {/*  tags and files and category  */}
        <div className="w-full mt-10 flex flex-col justify-start items-center gap-10">
          {/*  files and category  */}
          <div className="w-full hidden md:flex justify-between items-center gap-8">
            <div className="w-full min-h-24 flex flex-col justify-start items-start gap-4">
              <div className="text-nowrap text-xl font-bold">Category</div>
              <SingleCategorySelectBox categoryList={categories}
                                       onUpdate={(category?: Category) => category && setFormData(prevArticleData => ({
                                         ...prevArticleData,
                                         category: category
                                       }))}/>
            </div>
            <div className="w-full min-h-28 flex flex-col justify-start items-start gap-4">
              <div className="w-full">
                <span className="text-nowrap text-xl font-bold">Attachment</span>
                <span className="ml-3 text-nowrap text-sm font-light text-gray-400">(File size limit: 100MB)</span>
              </div>
              <div
                  className="w-full flex flex-1 justify-center items-center border border-dashed border-gray-300"
                  onClick={handleFileUpload}>
                <FileUploadButton/>
                <div/>
              </div>
            </div>
          </div>
          <div className="w-full md:hidden flex flex-col justify-start items-start gap-4">
            <div className="text-nowrap text-xl font-bold">Category</div>
            <SingleCategorySelectBox categoryList={categories}
                                     onUpdate={categoryName => setFormData(prevState => ({
                                       ...prevState,
                                       categoryName: categoryName
                                     }))}/>
          </div>
          <div className="w-full min-h-28 md:hidden flex flex-col justify-start items-start gap-4">
            <div className="w-full">
              <span className="text-nowrap text-xl font-bold">Attachment</span>
              <span className="ml-3 text-nowrap text-sm font-light text-gray-400">(File size limit: 100MB)</span>
            </div>
            <div
                className="w-full flex flex-1 justify-center items-center gap-2 border border-dashed border-gray-300"
                onClick={handleFileUpload}>
              <FileUploadButton/>
            </div>
          </div>
          {/*  tags  */}
          <div className="w-full mt-1">
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <div className="text-nowrap text-xl font-bold">Tags</div>
              <div className="w-full mt-3">
                <TagPoolForArticleModification tagList={tags} ref={tagPoolRef}
                                               onUpdate={(tagList) => setFormData(prevState => ({
                                                 ...prevState,
                                                 tagNameList: tagList.map(tag => tag.name)
                                               }))}
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
  );
});

export default ArticleModificationForm;
