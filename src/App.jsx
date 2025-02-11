import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from "./layouts/RootLayout";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

import { useEffect, useState } from "react";
import Toast from "./utils/Toast";
import { useAuthStore } from "./store/useAuthStore";
import { useLocation } from "react-router-dom";
import { notifyWarn } from "./utils/notify";
import NotFound from "./pages/NotFound";
import axiosInstance from "./lib/axios";
import Test from "./pages/Test";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  const location = useLocation();

  const checkBackendConnection = async () => {
    try {
      const response = await axiosInstance("/test");
      console.log("Successfully connected to backend:", response);
    } catch (error) {
      console.log("Error connecting to backend.");
    }
  };

  useEffect(() => {
    checkAuth();
    checkBackendConnection();
  }, []);

  return (
    <div
      className={`*
      "flex items-center justify-center h-screen 
      ${location.pathname === "/chat" ? "overflow-hidden" : ""}
      "`}>
      {!authUser && (
        <div role="alert" className="alert alert-warning flex  ">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg> */}
          <div className="flex m-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            &nbsp; Since we are using free servers initial requests might take
            longer than ususal due to inactivity. Please be patient.
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route
            path="chat"
            element={authUser ? <ChatPage /> : <Navigate to="/" />}
          />
          <Route
            path="login"
            element={!authUser ? <LogIn /> : <Navigate to="/" />}
          />
          <Route
            path="signup"
            element={!authUser ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="logout" element={<Homepage />} />
          <Route path="test" element={<Test />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toast />
    </div>
  );
}

export default App;
