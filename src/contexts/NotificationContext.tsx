import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import Notification, { HandleNotificationOpen } from "@/components/mui/Notification";
import { NotificationProps } from "@/types";

interface NotificationContextProps {
  showNotification: (props: NotificationProps) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  showNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const notificationRef = useRef<HandleNotificationOpen>(null);
  const [localNotificationProps, setLocalNotificationProps] = useState<NotificationProps>({
    duration: 6000,
    vertical: "top",
    horizontal: "right",
    message: "This is a notification. ",
    severity: "info",
    variant: "filled"
  });

  const showNotification = useCallback((props: NotificationProps) => {
    if (notificationRef.current) {
      setLocalNotificationProps(prevState => ({ ...prevState, ...props }));
      notificationRef.current.openNotification(true);
    }
  }, []);

  return (
      <NotificationContext.Provider value={{ showNotification }}>
        {children}
        <Notification ref={notificationRef} duration={localNotificationProps.duration}
                      vertical={localNotificationProps.vertical} horizontal={localNotificationProps.horizontal}
                      message={localNotificationProps.message} severity={localNotificationProps.severity}
                      variant={localNotificationProps.variant}/>
      </NotificationContext.Provider>
  );
};
