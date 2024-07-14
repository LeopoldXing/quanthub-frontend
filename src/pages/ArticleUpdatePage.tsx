import { useRef, useState } from 'react';
import ArticleModificationForm, {
  HandleArticleModificationFormSubmission
} from "@/components/forms/ArticleModificationForm.tsx";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiConfirmBox from "@/components/mui/MuiConfirmBox.tsx";
import { ButtonStyleType, CompleteArticleData } from "@/types.ts";
import { sleep } from "@/utils/GlobalUtils.ts";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/contexts/NotificationContext.tsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { fakeCompleteArticles } from "@/lib/dummyData.ts";
import { Modal, Paper } from "@mui/material";
import Article from "@/components/Article.tsx";
import { v4 as uuidv4 } from "uuid";
import { ArticleModificationFormZodDataType } from "@/components/forms/schemas/ArticleModificationFormSchema.ts";

type ArticleUpdatePageProp = {
  initialData: CompleteArticleData;
}

const ArticleUpdatePage = ({ initialData }: ArticleUpdatePageProp) => {
  const navigate = useNavigate();
  // article modification form ref
  const articleFormRef = useRef<HandleArticleModificationFormSubmission>(null);
  // notification
  const { showNotification } = useNotification();

  /*  dialog  */
  const [confirmBoxOpen, setConfirmBoxOpen] = useState<boolean>(false);
  const [confirmBoxData, setConfirmBoxData] = useState<ButtonStyleType>({
    title: "Confirm action?",
    description: "",
    cancelOptionText: "Cancel",
    confirmOptionText: "Confirm",
    cancelOptionVariant: "text",
    confirmOptionVariant: "contained",
    cancelOptionColor: "error",
    confirmOptionColor: "primary",
    cancelOptionStartIcon: undefined,
    confirmOptionStartIcon: undefined,
    cancelOptionEndIcon: undefined,
    confirmOptionEndIcon: undefined,
    confirmOptionLoadingPosition: "center"
  });
  const [confirmAction, setConfirmAction] = useState<() => Promise<void>>(() => async () => { });

  const handleDialogClose = () => {
    setConfirmBoxOpen(false);
  }

  const onConfirm = async () => {
    await confirmAction();
  }

  const [currentFormData, setCurrentFormData] = useState<ArticleModificationFormZodDataType>({
    title: "",
    subtitle: null,
    contentHtml: null,
    contentText: null,
    contentJson: null,
    categoryName: null,
    pictureLinkList: [],
    attachmentLink: null,
    tagNameList: []
  });

  const handleFormDataChange = (formData: ArticleModificationFormZodDataType) => {
    setCurrentFormData(formData);
  };


  /*  preview  */
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<CompleteArticleData>();
  const handlePreviewClose = () => {
    setPreviewOpen(false);
    setArticleData(undefined);
  }
  const handlePreview = () => {
    console.log("preview")
    console.log(currentFormData);
    if (currentFormData) {
      setArticleData({
        id: uuidv4(),
        title: currentFormData.title,
        subtitle: currentFormData.subtitle || "",
        tags: currentFormData.tagNameList?.map(tagName => ({ id: uuidv4(), name: tagName })) || [],
        category: { id: uuidv4(), name: currentFormData.categoryName || "unknown" },
        contentHtml: currentFormData.contentHtml || "",
        contentText: currentFormData.contentText || "",
        contentJson: currentFormData.contentJson || "",
        coverImageLink: undefined,
        rate: 9.0,
        comments: [],
        likes: "0",
        views: "1",
        author: {
          id: uuidv4(),
          username: "myself",
          role: "user"
        },
        publishTimestamp: BigInt(Date.now()),
        updateTimestamp: BigInt(Date.now()),
        publishTillToday: "a few seconds ago",
        updateTillToday: "a few seconds ago"
      });
      // open preview
      setPreviewOpen(true);
    } else {
      showNotification({
        message: "Please check your input",
        severity: "warning",
        horizontal: "right",
        vertical: "bottom"
      });
    }
  }

  /*  publish  */
  const handlePublish = async () => {
    const formData = articleFormRef.current?.submit();
    if (formData) {
      await sleep(2000);
      navigate("/article/detail", {
        state: {
          articleId: 1,
          initialArticleData: fakeCompleteArticles[0]
        }
      });
      showNotification({
        message: "Your article is published.",
        severity: "success",
        horizontal: "right",
        vertical: "bottom"
      });
      window.scrollTo(0, 0);
    } else {
      showNotification({
        message: "Please check your input",
        severity: "warning",
        horizontal: "right",
        vertical: "bottom"
      });
    }
  }

  const openPublishConfirmDialog = () => {
    setConfirmBoxData(prevState => ({
      ...prevState,
      title: "Publish this article?",
      description: "By confirming, this article will be published and made available to all users. Are you sure you want to proceed?",
      confirmOptionText: "Publish",
      confirmOptionColor: "primary",
      confirmOptionStartIcon: undefined,
      confirmOptionEndIcon: <SendIcon fontSize="small"/>,
      confirmOptionLoadingPosition: "end",
      option3Text: undefined
    }));
    setConfirmAction(() => handlePublish);
    setConfirmBoxOpen(true);
  }

  /*  save draft  */
  const [savingDraft, setSavingDraft] = useState<boolean>(false);
  const handleSaveDraft = async () => {
    setSavingDraft(true);
    console.log(currentFormData);
    await sleep(1000);
    setSavingDraft(false);
    showNotification({
      message: "Draft saved.",
      severity: "success",
      horizontal: "right",
      vertical: "top"
    });
  }


  /*  cancel  */
  const handleCancel = async () => {
    navigate(-1);
    /*window.scrollTo(0, 0);*/
  }

  const openCancelDialog = () => {
    setConfirmBoxData(prevState => ({
      ...prevState,
      title: "Delete draft and leave this page?",
      description: "By confirming, any unsaved changes to your draft will be permanently deleted and you will leave this page. Are you sure you want to proceed?",
      cancelOptionColor: "primary",
      confirmOptionText: "Leave",
      confirmOptionColor: "error",
      confirmOptionStartIcon: <DeleteIcon/>,
      confirmOptionEndIcon: undefined
    }));
    setConfirmAction(() => handleCancel);
    setConfirmBoxOpen(true);
  }

  // go back
  const handleSaveAndLeave = async () => {
    await sleep(1000);
    showNotification({
      message: "Draft saved.",
      severity: "success",
      horizontal: "right",
      vertical: "bottom"
    });
    navigate(-1);
    /*window.scrollTo(0, 0);*/
  }
  const handleLeave = async () => {
    navigate(-1);
  }

  const openGoBackDialog = () => {
    setConfirmBoxData(prevState => ({
      ...prevState,
      title: "Leave this page? ",
      description: "By confirming, any unsaved changes to your draft will be permanently deleted and you will leave this page. Are you sure you want to proceed?",
      cancelOptionColor: "primary",
      confirmOptionEndIcon: undefined,
      cancelOptionVariant: "text",
      confirmOptionText: "Save and Leave",
      confirmOptionColor: "primary",
      confirmOptionStartIcon: undefined,
      cancelOptionEndIcon: undefined,
      option3Text: "Dont save",
      option3StartIcon: undefined,
      option3EndIcon: undefined,
      option3Color: "error",
      option3Variant: "outlined",
      option3Action: handleLeave
    }));
    setConfirmAction(() => handleSaveAndLeave);
    setConfirmBoxOpen(true);
  }

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        <Button startIcon={<ArrowBackIosIcon fontSize="small"/>}
                sx={{ fontWeight: "bold", color: "black" }}
                onClick={openGoBackDialog}>
          Back
        </Button>
        {/*  title  */}
        <div className="w-full mt-10 space-y-10 md:space-y-0 md:flex justify-between items-center">
          <div className="text-4xl font-bold">Create Article</div>
          <div className="flex flex-nowrap justify-start md:justify-center items-center gap-4">
            <Button variant="outlined" onClick={handlePreview} color="secondary">Preview</Button>
            <Button variant="contained" onClick={openPublishConfirmDialog} endIcon={<SendIcon fontSize="small"/>}
                    color="primary">Publish</Button>
          </div>
        </div>
        {/*  Form  */}
        <div className="w-full mt-10">
          <ArticleModificationForm mode="create" initialData={{ author: { username: "lll" } }} ref={articleFormRef}
                                   onSaveDraft={handleSaveDraft} onCancel={openCancelDialog}
                                   isSavingDraft={savingDraft} onFormDataChange={handleFormDataChange}/>
        </div>

        <MuiConfirmBox open={confirmBoxOpen} handleClose={handleDialogClose} buttonStyle={confirmBoxData}
                       onConfirm={onConfirm}/>
        {/*  preview  */}
        <Modal
            open={previewOpen}
            onClose={handlePreviewClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Paper square={false} sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            py: 6,
            px: 8,
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "80%",
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            overflow: "scroll"
          }}>
            <div className="mb-8 flex justify-end items-center">
              <Button sx={{ fontWeight: "bold", color: "black" }} onClick={handlePreviewClose}>
                Done
              </Button>
            </div>
            <Article articleData={articleData} isPreview={true}/>
          </Paper>
        </Modal>
      </div>
  );
};

export default ArticleUpdatePage;
