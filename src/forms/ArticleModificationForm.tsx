import MuiRichTextEditor, { handleRichTextEditorData } from "@/components/mui/RichTextEditor/MuiRichTextEditor.tsx";
import { MenuControlsContainer } from "mui-tiptap";
import EditorMenuControls from "@/components/mui/RichTextEditor/EditorMenuControls.tsx";
import { categories, exampleContentHtml, exampleContentJson, tags } from "@/lib/dummyData.ts";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback } from "react";
import { ArticleComment, Tag } from "@/types.ts";
import {
  articleModificationFormSchema,
  ArticleModificationFormZodDataType
} from "@/forms/schemas/ArticleModificationFormSchema.ts";
import SingleCategorySelectBox from "@/components/mui/SingleCategorySelectBox.tsx";
import FileUploadButton from "@/components/mui/FileUploadButton.tsx";
import TagPoolForArticleModification, { HandleSelectedTagData } from "@/components/TagPoolForArticleModification.tsx";

export interface HandleArticleModificationFormSubmission {
  getArticleContent: (contentType: "text" | "json" | "html" | "html&text") => ArticleModificationFormZodDataType;
  submit: () => ArticleModificationFormZodDataType | undefined;
}

type ArticleModificationFormProps = {
  initialData: {
    initialFormData: ArticleModificationFormZodDataType;
    metaData?: {
      likes: bigint;
      views: bigint;
      comments: ArticleComment[];
    }
  };
  mode?: "create" | "edit";
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
    title: initialData?.initialFormData?.title || "",
    subtitle: initialData?.initialFormData?.subtitle || null,
    contentHtml: initialData?.initialFormData?.contentHtml || exampleContentHtml,
    contentText: "",
    contentJson: initialData?.initialFormData?.contentJson || JSON.stringify(exampleContentJson),
    categoryName: initialData?.initialFormData?.categoryName || "",
    pictureLinkList: [],
    attachmentLink: null,
    tagNameList: initialData?.initialFormData?.tagNameList || []
  });

  // 优化 useEffect，避免不必要的状态更新
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
  const fetchArticleContent = useCallback((contentType: "text" | "json" | "html" | "html&text") => {
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
        contentJson = textEditorRef.current.getJson();
      }
    }
    return { contentText, contentHtml, contentJson };
  }, []);

  // validate form data
  const [errors, setErrors] = useState<{ [key in keyof ArticleModificationFormZodDataType]?: string }>({});
  const validateFormData = useCallback((data: ArticleModificationFormZodDataType): boolean => {
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
  }, []);

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
        tagNameList: selectedTagList?.map(selectedTag => selectedTag.name) || []
      }))
      if (validateFormData(formData)) {
        return formData;
      }
      return undefined;
    }
  }));

  /*  handle file upload button click  */
  const handleFileUpload = useCallback(() => {
    console.log("文件上传");
    console.log(formData);
  }, [formData]);

  const handleTitleChange = useCallback((e) => {
    setFormData(prevState => ({ ...prevState, title: e.target.value }));
  }, []);

  const handleSubtitleChange = useCallback((e) => {
    setFormData(prevState => ({ ...prevState, subtitle: e.target.value }));
  }, []);

  const handleCategoryChange = useCallback((categoryName: string) => {
    setFormData(prevState => ({ ...prevState, categoryName }));
  }, []);

  const handleTagUpdate = useCallback((tagList: Tag[]) => {
    setFormData(prevState => ({ ...prevState, tagNameList: tagList.map(tag => tag.name) }));
  }, []);

  const handleEditorUpdate = useCallback((content: {
    contentText: string,
    contentHtml: string,
    contentJson: string
  }) => {
    setFormData(prevState => ({
      ...prevState,
      contentText: content.contentText,
      contentHtml: content.contentHtml,
      contentJson: content.contentJson
    }));
  }, []);

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
              onChange={handleTitleChange}
              autoFocus
              value={formData.title}
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
              onChange={handleSubtitleChange}
              value={formData.subtitle || ''}
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
              initialContent={mode === "create" ? exampleContentHtml : initialData.initialFormData.contentHtml || exampleContentHtml}
              ref={textEditorRef}
              onSaveDraft={onSaveDraft}
              onCancel={onCancel}
              onUpdate={handleEditorUpdate}
              isSavingDraft={isSavingDraft}
          />
        </div>

        {/*  tags and files and category  */}
        <div className="w-full mt-10 flex flex-col justify-start items-center gap-10">
          {/*  files and category  */}
          <div className="w-full hidden md:flex justify-between items-center gap-8">
            <div className="w-full min-h-24 flex flex-col justify-start items-start gap-4">
              <div className="text-nowrap text-xl font-bold">Category</div>
              <SingleCategorySelectBox categoryList={categories} initialCategoryName={initialData.initialFormData.categoryName || ""}
                                       onUpdate={handleCategoryChange}/>
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
                                     onUpdate={handleCategoryChange}/>
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
                <TagPoolForArticleModification tagList={tags} ref={tagPoolRef} initialTagNameList={initialData.initialFormData.tagNameList}
                                               onUpdate={handleTagUpdate}/>
              </div>
            </div>
          </div>
        </div>
      </Box>
  );
});

export default ArticleModificationForm;
