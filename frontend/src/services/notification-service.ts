import { apiClient } from "./api-client";
import { NotificationType } from "../types/types";
const PORT = import.meta.env.PORT_NOT || 3004;

export const getNotificationsByUser = async (userId: string) => {
  try {
    return await apiClient<NotificationType[]>(PORT, `notification/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

export const readNotification = async (notificationId: string) => {
  try {
    return await apiClient<NotificationType>(
      PORT,
      `notification/${notificationId}`,
      "PUT",
      { status: "read" }
    );
  } catch (error) {
    console.error(error);
  }
};
