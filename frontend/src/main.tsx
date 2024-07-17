import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import Root from "./routes/Root";
import Profile from "./routes/Profile";
import Order from "./routes/Order";
import Messages from "./routes/Messages";
import { AuthContextProvider } from "./contexts/AuthContext";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <App />,
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
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
