import { useCallback, useRef, useState } from 'react';
import ArticleModificationForm, { HandleArticleModificationFormSubmission } from "@/forms/ArticleModificationForm.tsx";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import MuiConfirmBox from "@/components/mui/MuiConfirmBox.tsx";
import { ButtonStyleType, CompleteArticleData } from "@/types.ts";
import { sleep } from "@/utils/GlobalUtils.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "@/contexts/NotificationContext.tsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Modal, Paper } from "@mui/material";
import Article from "@/components/Article.tsx";
import { v4 as uuidv4 } from "uuid";
import Cookies from 'js-cookie';
import { ArticleModificationFormZodDataType } from "@/forms/schemas/ArticleModificationFormSchema.ts";
import { useCreateArticle, useSaveDraft, useUpdateArticle } from "@/api/ArticleApi.ts";

const ArticleModificationPage = () => {
  const location = useLocation();
  const initialData: CompleteArticleData = location.state?.articleData;
  const mode = !initialData ? "create" : "edit";
  const { publishArticle } = useCreateArticle();
  const { updateArticle } = useUpdateArticle();
  const initialFormData: ArticleModificationFormZodDataType = {
    title: "",
    subtitle: null,
    contentHtml: null,
    contentText: null,
    contentJson: null,
    categoryName: null,
    pictureLinkList: [],
    attachmentLink: null,
    tagNameList: []
  };
  if (mode === "edit") {
    initialFormData.title = initialData.title;
    initialFormData.subtitle = initialData.subtitle || null;
    initialFormData.contentHtml = initialData.contentHtml;
    initialFormData.categoryName = initialData.category?.name;
    initialFormData.pictureLinkList = [];
    initialFormData.attachmentLink = null;
    initialFormData.tagNameList = initialData.tags;
  }

  const navigate = useNavigate();
  const articleFormRef = useRef<HandleArticleModificationFormSubmission>(null);
  const { showNotification } = useNotification();

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

  const handleDialogClose = useCallback(() => {
    setConfirmBoxOpen(false);
  }, []);

  const onConfirm = useCallback(async () => {
    await confirmAction();
  }, [confirmAction]);

  const [currentFormData, setCurrentFormData] = useState<ArticleModificationFormZodDataType>(initialFormData);

  const handleFormDataChange = useCallback((formData: ArticleModificationFormZodDataType) => {
    setCurrentFormData(formData);
  }, []);

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<CompleteArticleData | undefined>(initialData);
  const handlePreviewClose = useCallback(() => {
    setPreviewOpen(false);
    setArticleData(undefined);
  }, []);

  const handlePreview = useCallback(() => {
    if (currentFormData) {
      setArticleData({
        id: uuidv4(),
        title: currentFormData.title,
        subtitle: currentFormData.subtitle || "",
        tags: currentFormData.tagNameList || [],
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
      setPreviewOpen(true);
    } else {
      showNotification({
        message: "Please check your input",
        severity: "warning",
        horizontal: "right",
        vertical: "bottom"
      });
    }
  }, [currentFormData, showNotification]);

  const handlePublish = useCallback(async () => {
    const formData = articleFormRef.current?.submit();
    const cookie = Cookies.get("quanthub-user");
    const currentUser = JSON.parse(cookie!).user;
    if (formData) {
      let publishedArticle = null;
      const requestParam = {
        articleId: initialData?.id || uuidv4(),
        authorId: currentUser.id,
        title: formData.title,
        subTitle: formData.subtitle || "",
        contentHtml: formData.contentHtml || "",
        contentText: formData.contentText || "",
        coverImageLink: formData.pictureLinkList ? formData.pictureLinkList[0] : undefined,
        category: formData.categoryName || undefined,
        tags: formData.tagNameList || undefined,
        attachmentLink: formData.attachmentLink || undefined,
        status: "published"
      };
      if (mode === "create") {
        publishedArticle = await publishArticle(requestParam);
      } else {
        publishedArticle = await updateArticle(requestParam);
      }
      navigate("/article/detail", {
        state: {
          articleId: 1,
          initialArticleData: publishedArticle
        }
      });
      showNotification({
        message: `Your article is ${mode === 'create' ? 'published' : 'updated'}.`,
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
  }, [navigate, showNotification]);

  const openPublishConfirmDialog = useCallback(() => {
    setConfirmBoxData(prevState => ({
      ...prevState,
      title: `${mode === "create" ? "Publish" : "Update"} this article?`,
      description: "By confirming, this article will be published and made available to all users. Are you sure you want to proceed?",
      confirmOptionText: mode === "create" ? "Publish" : "Update",
      confirmOptionColor: "primary",
      confirmOptionEndIcon: mode === "create"
          ? <SendIcon fontSize="small"/>
          : <SystemUpdateAltOutlinedIcon fontSize="small"/>,
      confirmOptionLoadingPosition: "end",
      option3Text: undefined
    }));
    setConfirmAction(() => handlePublish);
    setConfirmBoxOpen(true);
  }, [handlePublish]);

  const [savingDraft, setSavingDraft] = useState<boolean>(false);
  const { saveDraft } = useSaveDraft();
  const handleSaveDraft = useCallback(async () => {
    setSavingDraft(true);
    const formData = articleFormRef.current?.submit()!;
    const cookie = Cookies.get("quanthub-user");
    const currentUser = JSON.parse(cookie!).user;
    const requestParam = {
      articleId: initialData?.id || uuidv4(),
      authorId: currentUser.id,
      title: formData.title,
      subTitle: formData.subtitle || "",
      contentHtml: formData.contentHtml || "",
      contentText: formData.contentText || "",
      coverImageLink: formData.pictureLinkList ? formData.pictureLinkList[0] : undefined,
      category: formData.categoryName || undefined,
      tags: formData.tagNameList || undefined,
      attachmentLink: formData.attachmentLink || undefined,
      status: "draft"
    };
    await saveDraft(requestParam);
    setSavingDraft(false);
    navigate("/my/articles");
    window.scrollTo(0, 0);
    showNotification({
      message: "Draft saved.",
      severity: "success",
      horizontal: "right",
      vertical: "bottom"
    });
  }, [showNotification]);

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const openCancelDialog = useCallback(() => {
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
  }, [handleCancel]);

  const handleSaveAndLeave = useCallback(async () => {
    await sleep(1000);
    showNotification({
      message: "Draft saved.",
      severity: "success",
      horizontal: "right",
      vertical: "bottom"
    });
    navigate(-1);
  }, [navigate, showNotification]);

  const handleLeave = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const openGoBackDialog = useCallback(() => {
    setConfirmBoxData(prevState => ({
      ...prevState,
      title: "Leave this page? ",
      description: "By confirming, any unsaved changes to your draft will be permanently deleted and you will leave this page. Are you sure you want to proceed?",
      cancelOptionColor: "primary",
      confirmOptionEndIcon: undefined,
      cancelOptionVariant: "text",
      confirmOptionText: "Save and Leave",
      confirmOptionColor: "primary",
      option3Text: "Don't save",
      option3Color: "error",
      option3Variant: "outlined",
      option3Action: handleLeave
    }));
    setConfirmAction(() => handleSaveAndLeave);
    setConfirmBoxOpen(true);
  }, [handleLeave, handleSaveAndLeave]);

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
        <Button startIcon={<ArrowBackIosIcon fontSize="small"/>}
                sx={{ fontWeight: "bold", color: "black" }}
                onClick={openGoBackDialog}>
          Back
        </Button>
        {/*  title  */}
        <div className="w-full mt-10 space-y-10 md:space-y-0 md:flex justify-between items-center">
          <div className="text-4xl font-bold">{mode === "create" ? "Create" : "Update"} Article</div>
          <div className="flex flex-nowrap justify-start md:justify-center items-center gap-4">
            <Button variant="outlined" onClick={handlePreview} color="secondary">Preview</Button>
            {mode === "create" ? (
                <Button variant="contained" onClick={openPublishConfirmDialog} endIcon={<SendIcon fontSize="small"/>}
                        color="primary">Publish</Button>
            ) : (
                <Button variant="contained" onClick={openPublishConfirmDialog}
                        endIcon={<SystemUpdateAltOutlinedIcon fontSize="small"/>}>Update</Button>
            )}
          </div>
        </div>
        {/*  Form  */}
        <div className="w-full mt-10">
          <ArticleModificationForm mode={mode} initialData={{ initialFormData: initialFormData }} ref={articleFormRef}
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

export default ArticleModificationPage;
