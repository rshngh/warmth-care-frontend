import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { notifyError, notifySuccess } from "../utils/notify";
import missWarmthAvatar from "../assets/missWarmthAvatar.svg";
import openai from "../lib/openai";
import { formatMessageTime } from "../utils/formatMessageTime";

import { useAuthStore } from "../store/useAuthStore";

const ChatBox = ({
  chatHistory,
  authUser,
  setNewMessage,
  isResponseLoading,
}) => {
  const messageSuggestions = [
    { text: "I am feeling alone.", bg: "chat-bubble-primary" },
    { text: "I need someone to talk to.", bg: "chat-bubble-secondary" },
    { text: "I am feeling happy.", bg: "chat-bubble-accent" },
    { text: "I need emotional support.", bg: "chat-bubble-info" },
    { text: "I am feeling low.", bg: "chat-bubble-success" },
    { text: "Something is bothering me.", bg: "chat-bubble-warning" },
    { text: "I need some advice.", bg: "chat-bubble-error" },
  ];

  {
    return (
      <div className="">
        {chatHistory.length === 0 ? (
          <div className=" ">
            <h1 className="  text-center mb-2">
              To start a conversation choose from below options or type your own
              message...
            </h1>
            <div className="flex overflow-x-auto">
              {messageSuggestions.map((suggestion) => {
                return (
                  <div
                    key={suggestion.bg}
                    className=" place-items-center text-nowrap  ">
                    <div
                      className={`chat-bubble ${suggestion.bg} m-2 cursor-pointer `}
                      onClick={(e) => setNewMessage(suggestion.text)}>
                      {suggestion.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          chatHistory.map((msg) => (
            <div key={msg._id} className="w-full mb-4">
              {msg.senderId === authUser._id ? (
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
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
                  <div className="chat-header">
                    You
                    {/* <time className="text-xs opacity-50">12:46</time> */}
                  </div>
                  <div className="chat-bubble">
                    {msg.text}
                    <div className="chat-footer opacity-50 text-right text-xs ml-10 ">
                      {formatMessageTime(msg.createdAt)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="chat chat-start">
                  <div className="chat-image avatar online">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={missWarmthAvatar}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    Miss Warmth
                    {/* <time className="text-xs opacity-50">12:45</time> */}
                  </div>
                  <div className="chat-bubble">
                    {msg.text}
                    <div className="chat-footer opacity-50 text-left">
                      {formatMessageTime(msg.createdAt)}
                    </div>
                  </div>
                  {/* <div className="chat-footer opacity-50">Delivered</div> */}
                </div>
              )}
            </div>
          ))
        )}
        {isResponseLoading && (
          <div className="chat chat-start">
            <div className="chat-image avatar online">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={missWarmthAvatar}
                />
              </div>
            </div>
            <div className="chat-header">
              Miss Warmth
              {/* <time className="text-xs opacity-50">12:45</time> */}
            </div>
            <div className="chat-bubble">
              <div className="loading loading-dots loading-xs"></div>
            </div>
            {/* <div className="chat-footer opacity-50">Delivered</div> */}
          </div>
        )}
      </div>
    );
  }
};

const ChatPage = () => {
  const [isChatLoading, setIsChatLoading] = useState(true);
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const { authUser } = useAuthStore();
  const [newMessage, setNewMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  //fetch old chatHistory
  const getMessages = async () => {
    try {
      const res = await axiosInstance.get(
        `/message/chat/${import.meta.env.VITE_WARMTH_CARE_BOT_ID}`
      );
      setChatHistory(res.data);
    } catch (error) {
      if (error.message === "Network Error") {
        notifyError(`${error.message}. Please retry after sometime.`);
      } else {
        notifyError(error.response.data.message);
      }
    } finally {
      setIsChatLoading(false);
    }
  };

  //send new message
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        `/message/send/${import.meta.env.VITE_WARMTH_CARE_BOT_ID}`,
        { text: newMessage }
      );

      setNewMessage("");
      setChatHistory([...chatHistory, res?.data]);
      setIsResponseLoading(true);
    } catch (error) {
      notifyError("Error while sending messsage. Please retry.");
    } finally {
    }

    //send reply
    const completion = await openai.chat.completions.create({
      model: "sophosympatheia/rogue-rose-103b-v0.2:free",
      messages: [
        {
          role: "user",
          content: newMessage,
        },
      ],
    });

    const reply = completion?.choices[0].message.content;

    try {
      const res = await axiosInstance.post(`/message/send/${authUser._id}`, {
        text: reply,
      });

      setChatHistory((chatHistory) => [...chatHistory, res?.data]);
    } catch (error) {
      notifyError("Error while fetching old messages.");
    } finally {
      setIsResponseLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="h-screen bg-base-200 ">
      {!authUser || isChatLoading ? (
        <div className="h-screen text-center place-content-center ">
          loading...
        </div>
      ) : (
        <div className="flex items-center justify-center pt-4  ">
          <div className="bg-base-100 p-2 rounded-lg w-full max-w-6xl h-[calc(100vh-9rem)] ">
            <div className="flex flex-col-reverse h-full rounded-lg overflow-auto ">
              <ChatBox
                authUser={authUser}
                chatHistory={chatHistory}
                setNewMessage={setNewMessage}
                isResponseLoading={isResponseLoading}
              />
              {chatHistory.length > 0 ? (
                <></>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-24 m-auto">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              )}
              <form className="max-w-6xl m-auto absolute inset-x-0 bottom-0 flex justify-end input input-bordered pr-0 mb-2">
                <input
                  type="text"
                  placeholder="Type here"
                  className=" w-full m-auto  "
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary m-auto"
                  disabled={!newMessage.trim()}
                  onClick={(e) => sendMessage(e)}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
