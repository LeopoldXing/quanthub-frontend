import { useRef, useState } from 'react';
import ArticleModificationForm, {
  HandleArticleModificationFormSubmission
} from "@/components/forms/ArticleModificationForm.tsx";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { categories, tags } from "@/lib/dummyData.ts";
import SingleCategorySelectBox from "@/components/mui/SingleCategorySelectBox.tsx";
import FileUploadButton from "@/components/mui/FileUploadButton.tsx";
import TagPoolForArticleModification, { HandleSelectedTagData } from "@/components/TagPoolForArticleModification.tsx";
import { v4 as uuidv4 } from 'uuid';
import MuiConfirmBox from "@/components/mui/MuiConfirmBox.tsx";
import { ArticleInfo, Category, ConfirmBoxDataType } from "@/types.ts";
import { sleep } from "@/utils/GlobalUtils.ts";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNotification } from "@/contexts/NotificationContext.tsx";

const ArticleCreationPage = () => {
  const navigate = useNavigate();
  // article modification form ref
  const articleFormRef = useRef<HandleArticleModificationFormSubmission>(null);
  // tag pool ref
  const tagPoolRef = useRef<HandleSelectedTagData>(null);
  // article data
  const [articleData, setArticleData] = useState<ArticleInfo>({
    id: uuidv4(),
    title: "",
    subtitle: "",
    tags: [],
    category: { id: uuidv4(), name: "" },
    contentHtml: "",
    contentText: "",
  });
  // notification
  const { showNotification } = useNotification();

  /*  get current article data  */
  const constructArticleData = (contentType: "html" | "json" | "text" | "html&text" = "text"): ArticleInfo => {
    // get article form data
    const formData = articleFormRef.current?.getFormData(contentType);
    // get tag list
    const selectedTagList = tagPoolRef.current?.getSelectedTagList();

    // construct article data
    return {
      id: uuidv4(),
      title: formData?.title || "",
      subtitle: formData?.subtitle || "",
      tags: selectedTagList || [],
      category: articleData.category,
      contentHtml: formData?.contentHtml || "",
      contentText: formData?.contentText || "",
      contentJson: formData?.contentJson || "",
      coverImageLink: formData?.coverImageLink || undefined
    }
  }

  /*  dialog  */
  const [confirmBoxOpen, setConfirmBoxOpen] = useState<boolean>(false);
  const confirmBoxInitialData: ConfirmBoxDataType = {
    title: "Confirm action?",
    description: "",
    option1Text: "Cancel",
    option2Text: "Confirm",
    option1Variant: "text",
    option2Variant: "contained",
    option1Color: "error",
    option2Color: "primary",
    option1StartIcon: undefined,
    option2StartIcon: undefined,
    option1endIcon: undefined,
    option2endIcon: undefined
  };
  const [confirmBoxData, setConfirmBoxData] = useState<ConfirmBoxDataType>(confirmBoxInitialData);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => () => { });

  const handleDialogClose = () => {
    setConfirmBoxOpen(false);
  }

  const onConfirm = () => {
    confirmAction();
  }

  /*  preview  */
  const handlePreview = () => {
    const articleInfo = constructArticleData("html");
    console.log(articleInfo);
  }


  /*  publish  */
  const handlePublish = () => {
    setConfirmBoxData(confirmBoxInitialData);
    const articleInfo = constructArticleData("html&text");
    console.log(articleInfo);
  }
  const openPublishConfirmDialog = () => {
    setConfirmBoxData(prevState => ({
      ...prevState,
      title: "Publish this article?",
      description: "By confirming, this article will be published and made available to all users. Are you sure you want to proceed?",
      option2Text: "Publish",
      option2endIcon: <SendIcon/>
    }));
    setConfirmAction(() => handlePublish);
    setConfirmBoxOpen(true);
  }


  /*  save draft  */
  const [savingDraft, setSavingDraft] = useState<boolean>(false);
  const handleSaveDraft = async () => {
    setSavingDraft(true);
    const formData = constructArticleData("html&text");
    await sleep(1000);
    setSavingDraft(false);
    showNotification({
      message: "Draft saved. ",
      severity: "success"
    });
  }


  /*  handle file upload button click  */
  const handleFileUpload = () => {
    const articleInfo = constructArticleData("html");
    console.log(articleInfo);
  }


  /*  cancel  */
  const handleCancel = () => {
    navigate("/articles");
    window.scrollTo(0, 0);
  }
  const openCancelDialog = () => {
    setConfirmBoxData(prevState => ({
      ...prevState,
      title: "Delete draft and leave this page?",
      description: "By confirming, any unsaved changes to your draft will be permanently deleted and you will leave this page. Are you sure you want to proceed?",
      option1Color: "primary",
      option2Text: "Leave",
      option2Color: "error",
      option2StartIcon: <DeleteIcon/>
    }));
    setConfirmAction(() => handleCancel);
    setConfirmBoxOpen(true);
  }


  // save and leave
  const [savingAndLeaving, setSavingAndLeaving] = useState<boolean>(false);
  const handleSaveAndLeave = async () => {
    setSavingAndLeaving(true);
    await sleep(1000);
    showNotification({
      message: "Draft saved. ",
      severity: "success"
    })
    setSavingAndLeaving(false);
    navigate("/articles");
    window.scrollTo(0, 0);
  }

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        {/*  title  */}
        <div className="w-full space-y-10 md:space-y-0 md:flex justify-between items-center">

          <div className="lg:hidden text-4xl font-bold">Create Article</div>
          <div className="hidden lg:flex items-end justify-start gap-16">
            <div className="text-4xl font-bold">Create Article</div>
            <LoadingButton variant="text" onClick={() => handleSaveAndLeave()} loading={savingAndLeaving}
                           startIcon={<ExitToAppIcon/>} sx={{
              color: "black",
              marginBottom: "1px"
            }}>
              Save and Leave
            </LoadingButton>
          </div>

          <div className="flex flex-nowrap justify-start md:justify-center items-center gap-4">
            <Button variant="outlined" onClick={handlePreview} endIcon={<PreviewOutlinedIcon/>}
                    color="secondary">Preview</Button>
            <Button variant="contained" onClick={openPublishConfirmDialog} endIcon={<SendIcon/>}
                    color="primary">Publish</Button>
          </div>
        </div>

        {/*  save and leave  */}
        <div className="lg:hidden mt-10">
          <LoadingButton variant="text" onClick={() => handleSaveAndLeave()} loading={savingAndLeaving}
                         startIcon={<ExitToAppIcon/>} sx={{
            color: "black",
            marginBottom: "1px"
          }}>
            Save and Leave
          </LoadingButton>
        </div>

        {/*  content  */}
        <div className="w-full mt-10">
          <ArticleModificationForm mode="create" initialData={{ author: { username: "lll" } }} ref={articleFormRef}
                                   onSaveDraft={handleSaveDraft} onCancel={openCancelDialog} savingDraft={savingDraft}/>
        </div>
        {/*  tags and files and category  */}
        <div className="w-full mt-10 flex flex-col justify-start items-center gap-10">
          {/*  files and category  */}
          <div className="w-full hidden md:flex justify-between items-center gap-8">
            <div className="w-full min-h-24 flex flex-col justify-start items-start gap-4">
              <div className="text-nowrap text-xl font-bold">Category</div>
              <SingleCategorySelectBox categoryList={categories}
                                       onUpdate={(category?: Category) => category && setArticleData(prevArticleData => ({
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
                                     onUpdate={(category?: Category) => category && setArticleData(prevArticleData => ({
                                       ...prevArticleData,
                                       category: category
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
                <TagPoolForArticleModification tagList={tags} ref={tagPoolRef}/>
              </div>
            </div>
          </div>
        </div>

        <MuiConfirmBox open={confirmBoxOpen} handleClose={handleDialogClose} data={confirmBoxData}
                       onConfirm={onConfirm}/>
      </div>
  );
};

export default ArticleCreationPage;
