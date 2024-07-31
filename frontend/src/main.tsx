import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home";
import Root from "./routes/Root";
import Profile from "./routes/Profile";
import Order from "./routes/Order";
import Messages from "./routes/Messages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { CartContextProvider } from "./contexts/CartContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotificationContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
