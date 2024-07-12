import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { ButtonStyleType } from "@/types.ts";

type MuiConfirmBoxProps = {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => Promise<void>;
  buttonStyle: ButtonStyleType;
};

const MuiConfirmBox = ({
                         open,
                         handleClose,
                         onConfirm,
                         buttonStyle = {
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
          gap: 3,
          marginY: "10px",
          marginRight: "25px",
        }}>
          <Button
              color={buttonStyle.option1Color}
              variant={buttonStyle.option1Variant}
              startIcon={buttonStyle.option1StartIcon}
              endIcon={buttonStyle.option1EndIcon}
              onClick={handleClose}
              disabled={loading}
          >
            {buttonStyle.option1Text}
          </Button>
          <LoadingButton
              variant={buttonStyle.option2Variant}
              color={buttonStyle.option2Color}
              autoFocus
              startIcon={buttonStyle.option2StartIcon}
              endIcon={buttonStyle.option2EndIcon}
              loading={loading}
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
            {buttonStyle.option2Text}
          </LoadingButton>
        </DialogActions>
      </Dialog>
  );
};

export default MuiConfirmBox;
