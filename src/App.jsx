import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from "./layouts/RootLayout";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

import { useEffect, useState } from "react";
import Toast from "./utils/Toast";
import Theme from "./pages/Theme";
import { useAuthStore } from "./store/useAuthStore";
import { useLocation } from "react-router-dom";
import { notifyWarn } from "./utils/notify";
import NotFound from "./pages/NotFound";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div
      className={`*
      "flex items-center justify-center h-screen 
      ${location.pathname === "/chat" ? "overflow-hidden" : ""}
      "`}>
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toast />
    </div>
  );
}

export default App;
