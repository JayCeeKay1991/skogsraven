import { useNotificationContext } from "../contexts/NotificationContext";
import React, { useState } from "react";
import moment from "moment";
import "./Messages.css";
import { useAuthContext } from "../contexts/AuthContext";
import { readNotification } from "../services/notification-service";

const Messages = () => {
  const { notifications, setNotifications } = useNotificationContext();
  const { user } = useAuthContext();
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
    <>
      <div id="messages-wrap">
        {user._id ? (
          <>
            <h3>Your Inbox</h3>
            {notifications && notifications.length ? (
              notifications.map((notification) => {
                return (
                  <div
                    key={notification._id}
                    id="message"
                    className={notification.status === "unread" ? "unread" : ""}
                  >
                    <p id="message-date">
                      {moment(notification.date).format(
                        "ddd, DD/MM/YYYY - HH:mm"
                      )}
                    </p>
                    <p>Order: {notification.orderId}</p>
                    <p>{notification.message}</p>
                    <div>
                      {notification.status == "unread" ? (
                        <button
                          id="read-button"
                          onClick={() =>
                            markAsRead(notification._id!.toString())
                          }
                        >
                          Read
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>You don't have any messages yet.</p>
            )}
          </>
        ) : (
          <h3>Log in to see your messages.</h3>
        )}
      </div>
    </>
  );
};

export default Messages;
