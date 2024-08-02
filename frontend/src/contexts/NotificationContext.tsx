import React, {
  createContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from "react";
import { NotificationType } from "../types/types";
import { getNotificationsByUser } from "../services/notification-service";
import { useAuthContext } from "./AuthContext";

type NotificationContextType = {
  notifications: NotificationType[];
  setNotifications: Dispatch<SetStateAction<NotificationType[]>>;
};

const initialNotificationContext: NotificationContextType = {
  notifications: [],
  setNotifications: () => {},
};

export const NotificationContext = createContext<NotificationContextType>(
  initialNotificationContext
);

export const NotificationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user._id) {
      const fetchAndSetNots = async () => {
        const notificationsByUser = await getNotificationsByUser(user._id);
        if (notificationsByUser) setNotifications(notificationsByUser);
      };
      fetchAndSetNots();
    }
  }, [user]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
