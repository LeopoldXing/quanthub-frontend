import { Alert, Snackbar } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { NotificationProps } from "@/types.ts";

export interface HandleNotificationOpen {
  openNotification: (indicator: boolean) => void;
}

const Notification = forwardRef<HandleNotificationOpen, NotificationProps>(({
                                                                              duration = 6000,
                                                                              vertical = "top",
                                                                              horizontal = "right",
                                                                              message = "This is a notification.",
                                                                              severity = "info",
                                                                              variant = "filled"
                                                                            }, ref) => {
  const [notificationOpen, setNotificationOpen] = useState(false);

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
          anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
          onClose={handleClose}
      >
        <Alert
            onClose={handleClose}
            severity={severity}
            variant={variant}
            sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
  );
});

export default Notification;
