import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { ConfirmBoxDataType } from "@/types.ts";

type MuiConfirmBoxProps = {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  data: ConfirmBoxDataType;
};

const MuiConfirmBox = ({
                         open, handleClose, onConfirm, data = {
    title: "Confirm action?",
    description: "",
    option1Text: "Cancel",
    option2Text: "Confirm",
    option1Variant: "outlined",
    option2Variant: "contained",
    option1Color: "error",
    option2Color: "primary",
    option1StartIcon: undefined,
    option2StartIcon: undefined,
    option1endIcon: undefined,
    option2endIcon: undefined
  }
                       }: MuiConfirmBoxProps) => {

  return (
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ marginTop: "15px", marginLeft: "10px" }}>
          <Typography fontSize="large" fontWeight="bold">{data.title}</Typography>
        </DialogTitle>
        <DialogContent sx={{ marginTop: "20px", marginX: "10px" }}>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: "medium", fontWeight: "lighter" }}>
            {data.description}
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
          <Button color={data.option1Color}
                  variant={data.option1Variant}
                  startIcon={data.option1StartIcon}
                  endIcon={data.option1endIcon}
                  onClick={handleClose}
          >
            {data.option1Text}
          </Button>
          <Button variant={data.option2Variant} color={data.option2Color} autoFocus startIcon={data.option2StartIcon}
                  endIcon={data.option2endIcon}
                  onClick={() => {
                    handleClose();
                    onConfirm();
                  }}
          >
            {data.option2Text}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default MuiConfirmBox;
