import { useNotificationContext } from "../contexts/NotificationContext";
import React from "react";
import "./Messages.css";
import { useAuthContext } from "../contexts/AuthContext";
import MessageItem from "./MessageItem";

const Messages = () => {
  const { notifications } = useNotificationContext();
  const { user } = useAuthContext();

  return (
    <>
      <div id="messages-wrap">
        {user._id ? (
          <>
            <h3>Your Inbox</h3>
            {notifications && notifications.length ? (
              notifications.map((notification) => {
                return <MessageItem notification={notification}></MessageItem>;
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
