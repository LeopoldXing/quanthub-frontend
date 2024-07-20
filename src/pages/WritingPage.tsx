import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import { Modal, Paper } from "@mui/material";
import Article from "@/components/Article.tsx";
import ContentModificationForm, { ContentModificationFormInterface } from "@/forms/ContentModificationForm.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CompleteArticleData,
  ConfirmBoxConfig,
  confirmBoxDefaultConfig,
  ContentModificationFormDataType,
  CurrentUserInfo
} from "@/types.ts";
import { useRef, useState } from "react";
import ConfirmBox from "@/components/ConfirmBox.tsx";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { sleep } from "@/utils/GlobalUtils.ts";
import { useCreateArticle, useUpdateArticle } from "@/api/ArticleApi.ts";
import { useNotification } from "@/contexts/NotificationContext.tsx";

const WritingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData: CompleteArticleData = location.state?.articleData;
  let initialFormData: ContentModificationFormDataType | undefined = undefined;
  if (initialData) {
    initialFormData = {
      authorId: initialData.author.id,
      title: initialData.title,
      subTitle: initialData.subtitle,
      content: {
        contentHtml: initialData.contentHtml,
        contentText: initialData.contentText!,
      },
      coverImageLink: initialData.coverImageLink,
      category: (initialData.category === 'unknown' || !initialData.category) ? "" : initialData.category,
      tags: initialData.tags,
      attachmentLink: initialData.attachmentLink,
      type: initialData.type
    };
  }
  const mode = !initialData ? "create" : "update";
  const contentModificationFormRef = useRef<ContentModificationFormInterface>(null);
  const { showNotification } = useNotification();

  /*  get user  */
  const cookie = Cookies.get("quanthub-user");
  let currentUser: CurrentUserInfo = null;
  if (cookie) {
    currentUser = JSON.parse(cookie);
  }


  /*  setup dialog config  */
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
  const handleDialogClose = () => {
    setConfirmBoxOpen(false);
  }
  const [confirmBoxData, setConfirmBoxData] = useState<ConfirmBoxConfig>(confirmBoxDefaultConfig);


  /*  handle preview  */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [articleData, setArticleData] = useState<CompleteArticleData>();
  const handlePreviewClose = () => {
    setPreviewOpen(false);
  }
  const handlePreview = () => {
    if (contentModificationFormRef.current) {
      const formData = contentModificationFormRef.current.getFormData();
      setArticleData({
        ...formData,
        id: uuidv4(),
        subtitle: formData.subTitle || "",
        tags: formData.tags || [],
        category: formData.category || "unknown",
        contentHtml: formData.content.contentHtml,
        contentText: formData.content.contentText,
        rate: 0,
        comments: [],
        likes: "1",
        isLiking: false,
        views: "1",
        author: {
          id: formData.authorId,
          username: currentUser!.user.username,
          role: currentUser!.user.role,
          avatarLink: currentUser!.user.avatarLink,
        },
        publishTimestamp: BigInt(Date.now()),
        updateTimestamp: BigInt(Date.now()),
        publishTillToday: "a few seconds ago",
        updateTillToday: "a few seconds ago"
      });
      console.log("preview - formData ->")
      console.log(formData);
      setPreviewOpen(true);
    }
  }


  /*  handle publish | update  */
  const openPublishConfirmDialog = () => {
    setConfirmBoxData({
      ...confirmBoxDefaultConfig,
      title: `${mode === "create" ? "Publish" : "Update"} this article?`,
      description: "By confirming, this article will be published and made available to all users. Are you sure you want to proceed?",
      option1Text: 'cancel',
      option1Color: 'info',
      option3Text: mode === "create" ? "Publish" : "Update",
      option3Color: "info",
      option3EndIcon: mode === "create"
          ? <SendIcon fontSize="small"/>
          : <SystemUpdateAltOutlinedIcon fontSize="small"/>,
      option3LoadingPosition: 'end',
      option3Action: handlePublish
    })
    setConfirmBoxOpen(true);
  }
  const handlePublish = async () => {
    console.log("文章发布")
    console.log(contentModificationFormRef.current?.getFormData());
    contentModificationFormRef.current?.triggerSubmit();
  }


  /*  handle go back  */
  const handleLeave = async () => {
    navigate(-1);
  }
  const openGoBackDialog = () => {
    setConfirmBoxData({
      ...confirmBoxDefaultConfig,
      title: "Leave this page? ",
      description: "By confirming, any unsaved changes to your draft will be permanently deleted and you will leave this page. Are you sure you want to proceed?",
      option1Text: "cancel",
      option1Color: "info",
      option2Text: "Don't save",
      option2Color: "error",
      option2Action: handleLeave,
      option3Text: "Save and Leave",
      option3Color: "primary",
      option3LoadingPosition: "center"
    });
    setConfirmBoxOpen(true);
  }


  /*  handle save draft  */
  const handleSaveDraft = async (data: ContentModificationFormDataType) => {
    console.log("保存草稿")
    await sleep(1000);
    console.log(data);
  }


  /*  handle submit  */
  const { publishArticle } = useCreateArticle();
  const { updateArticle } = useUpdateArticle();
  const handleSubmit = async (data: ContentModificationFormDataType) => {
    console.log("发布")
    console.log(data);
    let publishedArticle;
    if (mode === 'create') {
      publishedArticle = await publishArticle({
        authorId: currentUser!.user.id,
        title: data.title,
        subTitle: data.subTitle || "",
        contentHtml: data.content.contentHtml,
        contentText: data.content.contentText,
        coverImageLink: data.coverImageLink,
        category: data.category,
        tags: data.tags,
        attachmentLink: data.attachmentLink,
        type: data.type
      });
    } else {
      publishedArticle = await updateArticle({
        ...data,
        authorId: currentUser!.user.id,
        subTitle: data.subTitle || "",
        articleId: initialData.id,
        contentHtml: data.content.contentHtml,
        contentText: data.content.contentText
      });
    }
    navigate("/article/detail", {
      state: {
        articleId: publishedArticle.id,
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
          <div
              className="text-4xl font-bold">{mode === "create" ? "Create" : "Update"} {initialData ? (initialData.type === "article" ? "Article" : "Announcement") : ("Article")}</div>
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
          <ContentModificationForm mode={mode} onSubmit={handleSubmit} initialData={initialFormData}
                                   onSaveDraft={handleSaveDraft} ref={contentModificationFormRef}/>
        </div>

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
            maxHeight: "90%",
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
            <Article articleData={articleData!} isPreview={true}/>
          </Paper>
        </Modal>
        {/*  confirm box  */}
        <ConfirmBox open={confirmBoxOpen} handleClose={handleDialogClose} config={confirmBoxData}/>
      </div>
  );
};

export default WritingPage;
