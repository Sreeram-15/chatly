import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "react-hot-toast";

const ChatPage = () => {
  const { logout, isLoggingOut } = useAuthStore();
  return (
    <div className="z-10">
      ChatPage
      <button className="auth-btn" type="submit" onClick={logout}>
        {/* Logout */}
        {isLoggingOut ? (
          <LoaderIcon className="w-full h-5 animate-spin text-center" />
        ) : (
          "Log Out"
        )}
      </button>
    </div>
  );
};

export default ChatPage;
