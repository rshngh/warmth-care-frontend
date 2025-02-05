import React from "react";
import { Navigate, NavLink, redirect, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { notifyError, notifySuccess } from "../utils/notify";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const { authUser, logOut } = useAuthStore();
  const navigate = useNavigate();

  //deleteChat for test user
  const deleteChat = async () => {
    const res = await axiosInstance.delete(`/message/delete`);
  };

  const logOutHandler = async () => {
    try {
      deleteChat();
      await axiosInstance.post("/user/logout");
      logOut();
      notifySuccess("Logged out successfully.");
      navigate("/");
    } catch (error) {
      notifyError("Failed to logout.");
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <div className="indicator mt-2">
          <span className="indicator-item badge badge-secondary">
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </span>
          <NavLink to="/" className="btn text-xl ">
            Warmth.Care
          </NavLink>
        </div>
      </div>
      {authUser ? (
        <div className="flex-none gap-2 bg-base-200 rounded-xl mt-auto">
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-ghost  avatar">
              <div className="rounded ">
                <div className="avatar">
                  <div className="w-10 rounded-full m-auto">
                    {authUser.avatar ? (
                      <img src={authUser.avatar} />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-10 m-auto">
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <p className="">{authUser.name}</p>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-44 p-2 shadow">
              <li>
                <button to="logout" onClick={logOutHandler}>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <NavLink className="btn mt-auto  " to="/login">
          Login
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
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
        </NavLink>
      )}
    </div>
  );
};

export default Header;
