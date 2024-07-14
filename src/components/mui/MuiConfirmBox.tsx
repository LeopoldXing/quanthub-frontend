import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { ButtonStyleType } from "@/types.ts";

type MuiConfirmBoxProps = {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => Promise<void>;
  onCancel?: () => void;
  buttonStyle: ButtonStyleType;
};

const MuiConfirmBox = ({
                         open,
                         handleClose,
                         onConfirm,
                         onCancel,
                         buttonStyle = {
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
                         }
                       }: MuiConfirmBoxProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginTop: "15px", marginLeft: "10px" }}>
          <Typography fontSize="large" fontWeight="bold">{buttonStyle.title}</Typography>
        </DialogTitle>
        <DialogContent sx={{ marginTop: "20px", marginX: "10px" }}>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: "medium", fontWeight: "lighter" }}>
            {buttonStyle.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: 1,
          marginY: "10px",
          marginRight: "25px",
        }}>
          {/*  cancel  */}
          <Button
              color={buttonStyle.cancelOptionColor}
              variant={buttonStyle.cancelOptionVariant}
              startIcon={buttonStyle.cancelOptionStartIcon}
              endIcon={buttonStyle.cancelOptionEndIcon}
              onClick={() => {
                onCancel && onCancel();
                handleClose();
              }}
              disabled={loading}
              sx={{ fontSize: "small" }}
              size="small"
          >
            {buttonStyle.cancelOptionText}
          </Button>
          {buttonStyle.option3Text && (
              <Button color={buttonStyle.option3Color}
                      variant={buttonStyle.option3Variant}
                      startIcon={buttonStyle.option3StartIcon}
                      endIcon={buttonStyle.option3EndIcon}
                      onClick={async () => {
                        if (buttonStyle.option3Action) {
                          await buttonStyle.option3Action();
                        }
                        handleClose();
                      }}
                      size="small"
                      sx={{ fontSize: "small" }}
                      disabled={loading}>
                {buttonStyle.option3Text}
              </Button>
          )}
          {/*  confirm  */}
          <LoadingButton
              variant={buttonStyle.confirmOptionVariant}
              color={buttonStyle.confirmOptionColor}
              autoFocus
              startIcon={buttonStyle.confirmOptionStartIcon}
              endIcon={buttonStyle.confirmOptionEndIcon}
              loading={loading}
              loadingPosition={buttonStyle.confirmOptionLoadingPosition}
              size="small"
              sx={{ fontSize: "small" }}
              onClick={async () => {
                setLoading(true);
                try {
                  await onConfirm();
                } finally {
                  setLoading(false);
                  handleClose();
                }
              }}
          >
            {buttonStyle.confirmOptionText}
          </LoadingButton>
        </DialogActions>
      </Dialog>
  );
};

export default MuiConfirmBox;
