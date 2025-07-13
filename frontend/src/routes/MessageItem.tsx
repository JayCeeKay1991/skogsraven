import React, { useState } from "react";
import moment from "moment";
import { NotificationType } from "../types/types";
import { useNotificationContext } from "../contexts/NotificationContext";
import { readNotification } from "../services/notification-service";

const MessageItem = ({ notification }: { notification: NotificationType }) => {
  const { setNotifications } = useNotificationContext();
  const [error, setError] = useState("");

  const markAsRead = async (notificationId: string) => {
    try {
      await readNotification(notificationId);

      setNotifications((prevList) =>
        prevList.map((not) =>
          not._id === notificationId ? { ...not, status: "read" } : not
        )
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occured.";
      setError(errorMessage);
    }
  };

  return (
    <div
      key={notification._id}
      id="message"
      className={notification.status === "unread" ? "unread" : ""}
    >
      <p id="message-date">
        {moment(notification.date).format("ddd, DD/MM/YYYY - HH:mm")}
      </p>
      <p>Order: {notification.orderId}</p>
      <p>{notification.message}</p>
      <div>
        {notification.status == "unread" ? (
          <button
            id="read-button"
            onClick={() => markAsRead(notification._id!.toString())}
          >
            Read
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
