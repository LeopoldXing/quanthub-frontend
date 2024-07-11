import { Alert, Snackbar } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

export interface HandleNotificationOpen {
  openNotification: (indicator: boolean) => void;
}

type NotificationProps = {
  duration?: number;
  vertical?: "bottom" | "top";
  horizontal?: "left" | "right" | "center";
  message?: string;
  serverity?: "success" | "warning" | "error" | "info";
}

const Notification = forwardRef<HandleNotificationOpen, NotificationProps>(({
                                                                              duration = 6000,
                                                                              vertical = "top",
                                                                              horizontal = "right",
                                                                              message = "This is a notification.",
                                                                              serverity = "info"
                                                                            }, ref) => {
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    openNotification(indicator: boolean = true) {
      setNotificationOpen(indicator);
    }
  }));

  const handleClose = () => {
    setNotificationOpen(false);
  }

  return (
      <Snackbar
          open={notificationOpen}
          autoHideDuration={duration}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleClose}
      >
        <Alert
            onClose={handleClose}
            severity={serverity}
            variant="filled"
            sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
  );
});

export default Notification;
