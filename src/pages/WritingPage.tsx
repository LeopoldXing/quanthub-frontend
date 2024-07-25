import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import { IconButton, Modal, Paper } from "@mui/material";
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
import { useCreateArticle, useUpdateArticle } from "@/api/ArticleApi.ts";
import { useNotification } from "@/contexts/NotificationContext.tsx";
import { useSaveDraft } from "@/api/DraftApi.ts";
import PublicIcon from "@mui/icons-material/Public";
import ArticleIcon from '@mui/icons-material/Article';

const WritingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData: CompleteArticleData = location.state?.articleData;
  const [isAnnouncement, setIsAnnouncement] = useState(initialData?.isAnnouncement || false);
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
      attachmentName: initialData.attachmentName,
      type: initialData.type,
      isAnnouncement: isAnnouncement
    };
  }
  let mode = 'create';
  if (initialData) {
    if (initialData.type === 'draft') {
      if (initialData.referenceId) {
        mode = 'update';
      }
    } else {
      mode = 'update';
    }
  }
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
        attachmentLink: formData.attachmentLink,
        attachmentName: formData.attachmentName,
        publishTimestamp: BigInt(Date.now()),
        updateTimestamp: BigInt(Date.now()),
        publishTillToday: "a few seconds ago",
        updateTillToday: "a few seconds ago"
      });
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
    contentModificationFormRef.current?.triggerSubmit();
  }


  /*  handle go back  */
  const handleLeave = async () => {
    if (initialData?.type === 'draft') {
      navigate('/my/articles');
    } else {
      navigate('/articles');
    }
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
      option3Action: async () => {
        await handleSaveDraft(contentModificationFormRef.current!.getFormData());
        await handleLeave();
      },
      option3LoadingPosition: "center"
    });
    setConfirmBoxOpen(true);
  }


  /*  handle save draft  */
  const [draftId, setDraftId] = useState(initialData?.draftId);
  const { saveDraft } = useSaveDraft();
  const handleSaveDraft = async (data: ContentModificationFormDataType) => {
    // determine referenceId
    let referenceId = initialData?.referenceId;
    if (data.type !== 'draft') {
      referenceId = initialData?.id;
    }
    console.log("准备保存草稿，表单数据：")
    console.log(data);
    const savedDraft: CompleteArticleData = await saveDraft({
      id: draftId,
      authorId: currentUser!.user.id,
      title: data.title,
      subTitle: data.subTitle || "",
      contentHtml: data.content.contentHtml,
      contentText: data.content.contentText,
      coverImageLink: data.coverImageLink,
      category: data.category,
      tags: data.tags,
      isAnnouncement: data.isAnnouncement || false,
      attachmentLink: data.attachmentLink,
      attachmentName: data.attachmentName,
      type: 'draft',
      referenceId: referenceId
    });
    setDraftId(savedDraft.id);
    showNotification({
      horizontal: 'left',
      vertical: 'bottom',
      severity: 'success',
      message: 'Draft saved!'
    });
  }


  /*  handle submit  */
  const { publishArticle } = useCreateArticle();
  const { updateArticle } = useUpdateArticle();
  const handleSubmit = async (data: ContentModificationFormDataType) => {
    let publishedArticle;
    try {
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
          attachmentName: data.attachmentName,
          type: data.type,
          draftId: draftId,
          isAnnouncement: isAnnouncement
        });
      } else {
        publishedArticle = await updateArticle({
          articleId: initialData?.referenceId || initialData?.id,
          authorId: currentUser!.user.id,
          title: data.title,
          subTitle: data.subTitle || "",
          contentHtml: data.content.contentHtml,
          contentText: data.content.contentText,
          category: data.category,
          coverImageLink: data.coverImageLink,
          tags: data.tags,
          attachmentLink: data.attachmentLink,
          attachmentName: data.attachmentName,
          type: data.type,
          draftId: draftId,
          isAnnouncement: isAnnouncement
        });
      }
    } catch (e) {
      console.error(e);
      showNotification({
        message: `Something unexpected happened, please try again.`,
        severity: "error",
        horizontal: "right",
        vertical: "bottom"
      });
      return;
    }
    navigate(`/article/detail/${publishedArticle.id}`, {
      state: {
        initialArticleData: publishedArticle
      }
    });
    showNotification({
      message: `Your article is ${mode === 'create' ? 'published' : 'updated'}.`,
      severity: "success",
      horizontal: "left",
      vertical: "bottom"
    });
    window.scrollTo(0, 0);
  }

  /*  change type  */
  const handleChangeType = () => {
    if (contentModificationFormRef.current) {
      contentModificationFormRef.current.articleOrAnnouncement(isAnnouncement ? 'article' : 'announcement');
      setIsAnnouncement(prevState => !prevState);
    }
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
          <div className="w-full flex justify-start items-center gap-4">
            <div
                className="text-4xl font-bold">
              {mode === "create" ? "Create" : "Update"} {isAnnouncement ? "Announcement" : "Article"}
            </div>
            {currentUser?.user.role.toLowerCase() === 'admin' && (
                isAnnouncement ? (
                    <IconButton onClick={handleChangeType}><ArticleIcon/></IconButton>
                ) : (
                    <IconButton onClick={handleChangeType}><PublicIcon/></IconButton>
                )
            )}
          </div>
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
