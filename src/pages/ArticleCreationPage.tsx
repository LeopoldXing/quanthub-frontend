import { useRef, useState } from 'react';
import ArticleModificationForm, {
  HandleArticleModificationFormSubmission
} from "@/components/forms/ArticleModificationForm.tsx";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiConfirmBox from "@/components/mui/MuiConfirmBox.tsx";
import { ButtonStyleType } from "@/types.ts";
import { sleep } from "@/utils/GlobalUtils.ts";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNotification } from "@/contexts/NotificationContext.tsx";

const ArticleCreationPage = () => {
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
    option1Text: "Cancel",
    option2Text: "Confirm",
    option1Variant: "text",
    option2Variant: "contained",
    option1Color: "error",
    option2Color: "primary",
    option1StartIcon: undefined,
    option2StartIcon: undefined,
    option1EndIcon: undefined,
    option2EndIcon: undefined
  });
  const [confirmAction, setConfirmAction] = useState<() => Promise<void>>(() => async () => { });

  const handleDialogClose = () => {
    setConfirmBoxOpen(false);
  }

  const onConfirm = async () => {
    await confirmAction();
  }

  /*  preview  */
  const handlePreview = () => {
    console.log("preview")
    console.log(articleFormRef.current?.submit());
  }

  /*  publish  */
  const handlePublish = async () => {
    const formData = articleFormRef.current?.submit();
    if(formData) {
      await sleep(2000);
      navigate("/articles");
      showNotification({
        message: "Your article is published.",
        severity: "success",
      });
      window.scrollTo(0, 0);
    } else {
      showNotification({
        message: "Please check your input",
        severity: "warning",
      });
    }
  }

  const openPublishConfirmDialog = () => {
    setConfirmBoxData(prevState => ({
      ...prevState,
      title: "Publish this article?",
      description: "By confirming, this article will be published and made available to all users. Are you sure you want to proceed?",
      option2Text: "Publish",
      option2Color: "primary",
      option2StartIcon: undefined,
      option2EndIcon: <SendIcon/>
    }));
    setConfirmAction(() => handlePublish);
    setConfirmBoxOpen(true);
  }

  /*  save draft  */
  const [savingDraft, setSavingDraft] = useState<boolean>(false);
  const handleSaveDraft = async () => {
    setSavingDraft(true);
    await sleep(1000);
    setSavingDraft(false);
    showNotification({
      message: "Draft saved.",
      severity: "success",
    });
  }


  /*  cancel  */
  const handleCancel = async () => {
    navigate("/articles");
    window.scrollTo(0, 80);
  }

  const openCancelDialog = () => {
    setConfirmBoxData(prevState => ({
      ...prevState,
      title: "Delete draft and leave this page?",
      description: "By confirming, any unsaved changes to your draft will be permanently deleted and you will leave this page. Are you sure you want to proceed?",
      option1Color: "primary",
      option2Text: "Leave",
      option2Color: "error",
      option2StartIcon: <DeleteIcon/>,
      option2EndIcon: undefined
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
      message: "Draft saved.",
      severity: "success",
    });
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
        {/*  Form  */}
        <div className="w-full mt-10">
          <ArticleModificationForm mode="create" initialData={{ author: { username: "lll" } }} ref={articleFormRef}
                                   onSaveDraft={handleSaveDraft} onCancel={openCancelDialog}
                                   isSavingDraft={savingDraft}/>
        </div>

        <MuiConfirmBox open={confirmBoxOpen} handleClose={handleDialogClose} buttonStyle={confirmBoxData}
                       onConfirm={onConfirm}/>
      </div>
  );
};

export default ArticleCreationPage;
