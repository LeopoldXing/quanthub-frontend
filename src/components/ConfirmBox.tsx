import { ConfirmBoxConfig } from "@/types.ts";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

type ConfirmBoxProps = {
  open: boolean;
  handleClose: () => void;
  onOption1?: () => Promise<void>;
  onOption2?: () => Promise<void>;
  onOption3?: () => Promise<void>;
  config: ConfirmBoxConfig;
}

const ConfirmBox = ({
                      open,
                      handleClose,
                      onOption3,
                      onOption1,
                      onOption2,
                      config
                    }: ConfirmBoxProps) => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ marginTop: "15px", marginLeft: "10px" }}>
          <Typography fontSize="large" fontWeight="bold">{config.title}</Typography>
        </DialogTitle>
        <DialogContent sx={{ marginTop: "20px", marginX: "10px" }}>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: "medium", fontWeight: "lighter" }}>
            {config.description}
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
          {/*  option 1  */}
          {config.option1Text && (
              <LoadingButton
                  color={config.option1Color}
                  variant={config.option1Variant}
                  startIcon={config.option1StartIcon}
                  endIcon={config.option1EndIcon}
                  onClick={async () => {
                    try {
                      setLoading1(true);
                      config.option1Action && await config.option1Action();
                      onOption1 && await onOption1();
                    } finally {
                      setLoading1(false);
                      handleClose();
                    }
                  }}
                  loading={loading1}
                  loadingPosition={config.option1LoadingPosition}
                  sx={{ fontSize: "small" }}
                  size="small"
              >
                {config.option1Text}
              </LoadingButton>
          )}
          {/*  option 2  */}
          {config.option2Text && (
              <LoadingButton
                  color={config.option2Color}
                  variant={config.option2Variant}
                  startIcon={config.option2StartIcon}
                  endIcon={config.option2EndIcon}
                  onClick={async () => {
                    try {
                      setLoading2(true);
                      config.option2Action && await config.option2Action();
                      onOption2 && await onOption2();
                    } finally {
                      setLoading2(false);
                      handleClose();
                    }
                  }}
                  loading={loading2}
                  loadingPosition={config.option2LoadingPosition}
                  sx={{ fontSize: "small" }}
                  size="small"
              >
                {config.option2Text}
              </LoadingButton>
          )}
          {/*  option 3  */}
          {config.option3Text && (
              <LoadingButton
                  color={config.option3Color}
                  variant={config.option3Variant}
                  startIcon={config.option3StartIcon}
                  endIcon={config.option3EndIcon}
                  onClick={async () => {
                    try {
                      setLoading3(true);
                      config.option3Action && await config.option3Action();
                      onOption3 && await onOption3();
                    } finally {
                      setLoading3(false);
                      handleClose();
                    }
                  }}
                  loading={loading3}
                  loadingPosition={config.option3LoadingPosition}
                  sx={{ fontSize: "small" }}
                  size="small"
              >
                {config.option3Text}
              </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
  );
};

export default ConfirmBox;
