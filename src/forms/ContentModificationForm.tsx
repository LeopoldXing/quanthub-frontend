import { Controller, useForm } from "react-hook-form";
import { ContentModificationFormDataType } from "@/types.ts";
import { Box, IconButton, Input, Modal, Skeleton, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MuiRichTextEditor from "@/components/mui/RichTextEditor/MuiRichTextEditor.tsx";
import { MenuControlsContainer } from "mui-tiptap";
import EditorMenuControls from "@/components/mui/RichTextEditor/EditorMenuControls.tsx";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { categories, exampleContentHtml, exampleContentText } from "@/lib/dummyData.ts";
import FileUploadButton from "@/components/mui/FileUploadButton.tsx";
import CategorySingleSelectBox from "@/components/CategorySingleSelectBox.tsx";
import TagPool4SelectAndCreate from "@/components/TagPool4SelectAndCreate.tsx";
import { useShuffleTags } from "@/api/TagApi.ts";
import { deleteFile, uploadFile } from "@/utils/S3BucketUtil.ts";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";

export interface ContentModificationFormInterface {
  getFormData: () => ContentModificationFormDataType;
  triggerSubmit: () => void;
}

type ContentModificationFormProps = {
  mode: "create" | "update",
  onSubmit: (data: ContentModificationFormDataType) => Promise<void>;
  onSaveDraft: (data: ContentModificationFormDataType) => Promise<void>;
  initialData?: ContentModificationFormDataType;
}
const ContentModificationForm = React.forwardRef<ContentModificationFormInterface, ContentModificationFormProps>(({
                                                                                                                    mode = "create",
                                                                                                                    initialData,
                                                                                                                    onSubmit,
                                                                                                                    onSaveDraft
                                                                                                                  }, ref) => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch
  } = useForm<ContentModificationFormDataType>({
    defaultValues: {
      content: {
        contentHtml: mode === "create" ? exampleContentHtml : initialData?.content.contentHtml || exampleContentHtml,
        contentText: mode === "create" ? exampleContentText : initialData?.content.contentText || exampleContentText
      },
      tags: initialData?.tags || [],
      type: initialData?.type || 'article',
      attachmentName: initialData?.attachmentName,
      attachmentLink: initialData?.attachmentLink,
    }
  });


  /*  handle submit  */
  const submit = async (data: ContentModificationFormDataType) => {
    await onSubmit(data);
  }


  /*  handle save draft  */
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const handleSaveDraft = async () => {
    try {
      setIsSavingDraft(true);
      await onSaveDraft(getValues());
    } finally {
      setIsSavingDraft(false);
    }
  }


  /*  handle file upload  */
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const attachmentName = watch("attachmentName");
  const attachmentLink = watch("attachmentLink");
  const handleProgressUpdate = (n: number) => {
    setProgress(prevProgress => {
      console.log(`updating progress from ${prevProgress} to ${n}`);
      return n;
    });
  }
  const handleFileUpload = async (file: File) => {
    setValue('attachmentName', file.name);
    setIsUploading(true);
    setProgress(0);
    try {
      const url = await uploadFile({ file: file, onProgressUpdate: handleProgressUpdate });
      setValue('attachmentLink', url);
      console.log(file);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  }
  const handleDeleteAttachment = () => {
    deleteFile(getValues('attachmentLink') || '');
    setValue('attachmentLink', undefined);
    setValue('attachmentName', undefined);
  }


  /*  get available tags  */
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const { shuffleTags, isLoading: isFetchingTags } = useShuffleTags();
  const fetchAvailableTags = async () => {
    try {
      const randomTags = await shuffleTags(30);
      setAvailableTags([...new Set([...randomTags, ...getValues('tags') || []])]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchAvailableTags();
  }, []);


  /*  expose form data  */
  useImperativeHandle(ref, () => ({
    getFormData() {
      return getValues();
    },
    triggerSubmit() {
      window.document.getElementById("submit_button")?.click();
    }
  }));


  /*  handle create new category  */
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const handleCreateCategory = () => {
    setNewCategoryModalOpen(false);

  }
  const openCreateCategoryModal = () => {
    setNewCategoryModalOpen(true);
  }

  return (
      <Box width="100%" component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Box width={"100%"}>
          <button type="submit" id="submit_button" className="hidden"/>
          {/*  Title  */}
          <InputLabel htmlFor="title" size="small">Title</InputLabel>
          <Controller
              name="title"
              control={control}
              rules={{
                required: 'Title is required',
                maxLength: { value: 250, message: "Title cannot exceed 250 characters" }
              }}
              defaultValue={initialData?.title || ""}
              render={({ field, fieldState }) => (
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="title"
                      size="small"
                      autoFocus
                      error={!!fieldState.error}
                      helperText={fieldState.error ? fieldState.error.message : ''}
                      {...field}
                  />
              )}
          />
          {/*  subtitle  */}
          <InputLabel htmlFor="sub_title" size="small">Sub Title*</InputLabel>
          <Controller
              name="subTitle"
              control={control}
              rules={{ maxLength: { value: 250, message: "Subtitle cannot exceed 250 characters" } }}
              defaultValue={initialData?.subTitle || ""}
              render={({ field, fieldState }) => (
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="sub_title"
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error ? fieldState.error.message : ''}
                      {...field}
                  />
              )}
          />
          {/*  Rich Text Editor  */}
          <div className="w-full px-8 mt-5 border-[1px] border-[#e0e0e0]">
            <Controller
                name="content"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <MuiRichTextEditor
                        onSaveDraft={handleSaveDraft}
                        isSavingDraft={isSavingDraft}
                        onChange={onChange}
                        value={value.contentHtml}
                        renderControls={() => (
                            <MenuControlsContainer>
                              <EditorMenuControls/>
                            </MenuControlsContainer>
                        )}
                    />
                )}
            />
          </div>
        </Box>
        {/*  tags and files and attachment  */}
        <div className="w-full mt-10 flex flex-col justify-start items-center gap-10">
          {/*  attachment and category  */}
          <div className="w-full hidden md:flex justify-between items-center gap-8">
            <div className="w-full min-h-24 flex flex-col justify-start items-start gap-4">
              {/*  category  */}
              <div className="w-full flex justify-start items-center gap-3">
                <div className="text-nowrap text-xl font-bold">Category</div>
                <IconButton size="small" onClick={openCreateCategoryModal}><AddIcon fontSize="small"/></IconButton>
              </div>
              <Controller
                  name="category"
                  control={control}
                  defaultValue={initialData?.category}
                  render={({ field: { onChange, value, onBlur } }) => (
                      <CategorySingleSelectBox availableCategoryList={categories.map(category => category.name)}
                                               initialData={initialData?.category || ""}
                                               onChange={onChange} onBlur={onBlur} value={value}/>
                  )}
              />
            </div>
            {/*  attachment  */}
            <div className="w-full min-h-28 flex flex-col justify-start items-start gap-4">
              <div className="w-full">
                <span className="text-nowrap text-xl font-bold">Attachment</span>
                <span className="ml-3 text-nowrap text-sm font-light text-gray-400">(File size limit: 100MB)</span>
              </div>
              <div
                  className="w-full flex flex-1 justify-center items-center gap-2 border border-dashed border-gray-300">
                {attachmentName && attachmentLink ? (
                    <div className="w-full pl-8 flex justify-start items-center gap-2">
                      <IconButton size="small"
                                  onClick={handleDeleteAttachment}><CloseIcon/></IconButton>{attachmentName}
                    </div>
                ) : (
                    <FileUploadButton onUpload={handleFileUpload}/>
                )}
              </div>
            </div>
          </div>
          {/*  small screen  */}
          <div className="w-full md:hidden flex flex-col justify-start items-start gap-4">
            {/*  category  */}
            <div className="w-full flex justify-start items-center gap-3">
              <div className="text-nowrap text-xl font-bold">Category</div>
              <IconButton size="small" onClick={openCreateCategoryModal}><AddIcon fontSize="small"/></IconButton>
            </div>
            <Controller
                name="category"
                control={control}
                defaultValue={initialData?.category}
                render={({ field: { onChange, value, onBlur } }) => (
                    <CategorySingleSelectBox availableCategoryList={categories.map(category => category.name)}
                                             initialData={initialData?.category || ""}
                                             onChange={onChange} onBlur={onBlur} value={value}/>
                )}
            />
          </div>
          {/*  attachment  */}
          <div className="w-full min-h-28 md:hidden flex flex-col justify-start items-start gap-4">
            <div className="w-full">
              <span className="text-nowrap text-xl font-bold">Attachment</span>
              <span className="ml-3 text-nowrap text-sm font-light text-gray-400">(File size limit: 100MB)</span>
            </div>
            <div
                className="w-full flex flex-1 justify-center items-center gap-2 border border-dashed border-gray-300">
              {attachmentName && attachmentLink ? (
                  <div className="w-full pl-8 flex justify-start items-center gap-2">
                    <IconButton size="small" onClick={handleDeleteAttachment}><CloseIcon/></IconButton>{attachmentName}
                  </div>
              ) : (
                  <FileUploadButton onUpload={handleFileUpload}/>
              )}
            </div>
          </div>
          {/*  tags  */}
          <div className="w-full mt-1">
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <div className="text-nowrap text-xl font-bold">Tags</div>
              <div className="w-full mt-3">
                {!isFetchingTags ? (
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <TagPool4SelectAndCreate control={control} onChange={onChange}
                                                     availableTagList={availableTags}
                                                     onDelete={tag => setAvailableTags(prevState => prevState.filter(prevTag => prevTag !== tag))}
                                                     onCreate={tag => setAvailableTags(prevState => [...prevState, tag])}/>
                        )}
                    />
                ) : (
                    <div className="w-full flex items-center justify-start gap-5 flex-wrap">
                      <Skeleton variant="text" width="100%" height={20}/>
                      <Skeleton variant="text" width="100%" height={20}/>
                      <Skeleton variant="text" width="100%" height={20}/>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/*  create new category  */}
        <Modal
            open={newCategoryModalOpen}
            onClose={() => setNewCategoryModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box square={false} sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            px: 4,
            pt: 4,
            pb: 6,
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            overflow: "hidden"
          }}>
            <Typography variant='h6' component='h2'>Enter new category name: </Typography>
            <TextField id="standard-basic" component="text" label="New Category" variant="standard" margin="normal"
                       sx={{ marginTop: 4 }} fullWidth onChange={e => setNewCategory(e.target.value)}/>
            <div className="w-full mt-6 flex justify-end items-center gap-5">
              <Button size="small" onClick={() => setNewCategoryModalOpen(false)}>Cancel</Button>
              <Button variant="contained" size="small">Confirm</Button>
            </div>
          </Box>
        </Modal>
      </Box>
  );
});

export default ContentModificationForm;
