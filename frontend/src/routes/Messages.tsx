import { useNotificationContext } from "../contexts/NotificationContext";
import React from "react";
import moment from "moment";

const Messages = () => {
  const { notifications } = useNotificationContext();

  return (
    <>
      <h2>Here are your messages 💌</h2>
      <div id="message-list-wrap">
        {notifications && notifications.length ? (
          notifications.map((notification) => {
            return (
              <div>
                <p>
                  {moment(notification.date).format("ddd, DD/MM/YYYY - HH:mm")}
                </p>
                <p>Order: {notification.orderId}</p>
                <p>{notification.message}</p>
              </div>
            );
          })
        ) : (
          <h2>No notifications for this user.</h2>
        )}
      </div>
    </>
  );
};

export default Messages;
