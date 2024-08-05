import { useNotificationContext } from "../contexts/NotificationContext";
import React, { useEffect } from "react";
import moment from "moment";
import "./Messages.css";
import { useAuthContext } from "../contexts/AuthContext";
import { getNotificationsByUser } from "../services/notification-service";

const Messages = () => {
  const { notifications, setNotifications } = useNotificationContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user._id) {
      const fetchAndSetNots = async () => {
        const notificationsByUser = await getNotificationsByUser(user._id);
        if (notificationsByUser) setNotifications(notificationsByUser);
      };
      fetchAndSetNots();
    }
  }, []);

  return (
    <>
      <div id="messages-wrap">
        {user._id ? (
          <>
            <h2>Here are your messages 💌</h2>
            {notifications && notifications.length ? (
              notifications.map((notification) => {
                return (
                  <div id="message">
                    <p id="message-date">
                      {moment(notification.date).format(
                        "ddd, DD/MM/YYYY - HH:mm"
                      )}
                    </p>
                    <p>Order: {notification.orderId}</p>
                    <p>{notification.message}</p>
                  </div>
                );
              })
            ) : (
              <p>You don't have any messages yet.</p>
            )}
          </>
        ) : (
          <h2>Log in to see your messages 💌</h2>
        )}
      </div>
    </>
  );
};

export default Messages;
