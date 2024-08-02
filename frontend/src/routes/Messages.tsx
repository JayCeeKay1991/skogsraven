import { useNotificationContext } from "../contexts/NotificationContext";
import React from "react";
import moment from "moment";
import "./Messages.css";

const Messages = () => {
  const { notifications } = useNotificationContext();

  return (
    <>
      <div id="messages-wrap">
        <h2>Here are your messages 💌</h2>
        {notifications && notifications.length ? (
          notifications.map((notification) => {
            return (
              <div id="message">
                <p id="message-date">
                  {moment(notification.date).format("ddd, DD/MM/YYYY - HH:mm")}
                </p>
                <p>Order: {notification.orderId}</p>
                <p>{notification.message}</p>
              </div>
            );
          })
        ) : (
          <p>You don't have any messages yet.</p>
        )}
      </div>
    </>
  );
};

export default Messages;
