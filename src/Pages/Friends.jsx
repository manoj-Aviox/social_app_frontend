import HOC from "../Layouts/HOC";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { GetAllUsers } from "../Redux/Actions/UserAction";
import { format } from "timeago.js";
import { MdCall, MdVideoCall, MdOutlineInfo } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { GetMessage, SendMessage } from "../Redux/Actions/MessageAction";
import { GetCHAT } from "../Redux/Actions/ChatsAction";
import InputEmojiWithRef from "react-input-emoji";

const Friends = () => {
  const socket = useRef();
  const dispatch = useDispatch();
  const allusersData = useSelector((item) => item.UserReducer.alluser);
  const profileData = useSelector((item) => item.UserReducer.profile);
  const allChatsData = useSelector((item) => item.ChatsReducer.chats);
  const messageData = useSelector((item) => item.MessageReducer.messages);
  const [chat_id, setChatId] = useState("");
  const [currentChatId, setCurrentChatId] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const scroll = useRef();

  const [activeUsers, setActiveUsers] = useState([]);
  console.log(activeUsers);

  // handleSubmit
  const handleSubmit = (receiverId) => {
    const payload = {
      textMessage: chatMessage,
      chatId: currentChatId,
      senderId: profileData._id,
    };
    dispatch(
      SendMessage(payload, () => {
        setChatMessage("");
      })
    );
    socket.current.emit("send-message", { ...payload, receiverId });
    setMessages([...messages, payload]);
  };

  // Connect to Socket.io
  useEffect(() => {
    dispatch(GetCHAT(profileData._id));
    socket.current = io("ws://localhost:4000");
    socket.current.emit("new-user-add", profileData._id);
  }, [profileData._id]);

  useEffect(() => {
    socket.current.on("get-users", (users) => {
      setActiveUsers(users);
    });
  }, [activeUsers, profileData._id]);

  // Get all users
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);

  // Get messages
  useEffect(() => {
    setMessages(messageData);
  }, [currentChatId]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      if (data.chatId === currentChatId) {
        setMessages([...messages, data]);
      }
    });
  }, [messages]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);

  return (
    <div id="page-container" className=" w-full min-h-screen bg-gray-100">
      <div className="  p-4 lg:p-8">
        <div className="flex bg-white h-[90vh] rounded shadow border w-full cs-chat">
          {/* All Conversationers */}
          <section className=" border-r h-full rounded-sm w-2/6">
            <div className="bg-white  p-3 h-16 flex z-40  items-center shadow top-0 left-0">
              <div className="rounded-full flex items-center w-full gap-3 border p-1.5 px-3">
                <input
                  type="text"
                  className="p-0 border-none focus:border-none   w-full text-sm tracking-wider outline-none focus:outline-none"
                  placeholder="Search friends..."
                />
              </div>
            </div>

            <div className="h-[80vh] cs-chat mt-0.5 w-full overflow-y-auto flex flex-col gap-2">
              {allChatsData?.map((item) => {
                return item.members.map((member) => {
                  return allusersData?.map((items) => {
                    return (
                      member === items._id &&
                      profileData._id !== member && (
                        <div
                          key={member}
                          onClick={() => {
                            dispatch(
                              GetMessage(item._id, (data) => setMessages(data))
                            );
                            setCurrentChatId(item._id);
                            setChatId(member);
                          }}
                          className={`flex gap-2 cursor-pointer items-center p-3  ${
                            items._id === chat_id && "bg-slate-50 "
                          }`}
                        >
                          <span className=" rounded-full  flex justify-center items-center  relative  p-0.5 ">
                            {items?.profilePicture ? (
                              <img
                                src={items?.profilePicture}
                                alt={items?.name}
                                className="w-11 h-11 object-cover object-top rounded-full"
                              />
                            ) : (
                              <svg
                                className="hi-solid hi-user-circle inline-block w-11 h-11 opacity-50"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </span>
                          <div className="flex flex-col text-sm">
                            <h4 className="capitalize font-semibold">
                              {items.name}
                            </h4>
                            <p className="text-green-400  text-xs  font-bold">
                              {activeUsers.map((act) => {
                                return act.userId === items._id && "Online";
                              })}
                            </p>
                          </div>
                        </div>
                      )
                    );
                  });
                });
              })}
            </div>
          </section>

          {/* Message Box Section */}
          <div className="w-4/6 relative  ">
            {chat_id === "" ? (
              <section className="w-full h-full flex gap-4 justify-center items-center flex-col">
                {/* when chat_id is not available */}
                <div className="flex justify-center items-center  text-7xl rounded-full ">
                  <TbSend />
                </div>
                <div className="bg-blue-400 cursor-pointer hover:bg-white uppercase border-blue-400 border hover:text-blue-400 text-white py-1.5 px-5 rounded-full">
                  Start Chat
                </div>
              </section>
            ) : (
              allusersData.map((item) => {
                return (
                  item._id === chat_id && (
                    <section className="">
                      {/* top_header */}
                      <div className="p-3 h-16 flex items-center gap-3 shadow w-full">
                        <span className="inline-block rounded-full   ">
                          {item?.profilePicture ? (
                            <img
                              src={item?.profilePicture}
                              alt={item?.name}
                              className="w-9 h-9 object-cover object-top rounded-full"
                            />
                          ) : (
                            <svg
                              className="hi-solid hi-user-circle inline-block w-9 h-9 opacity-50"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </span>
                        <span className=" text-sm">{item.name}</span>
                        <div className="ml-auto flex text-2xl gap-4 items-center">
                          <span>
                            <MdCall />
                          </span>
                          <span>
                            <MdVideoCall />
                          </span>
                          <span>
                            <MdOutlineInfo />
                          </span>
                        </div>
                      </div>
                      {/* chat section */}
                      <section
                        id="messageContainer"
                        className="p-4 overflow-y-auto mt-0.5 max-h-[70vh] bg-white relative flex flex-col
                       gap-2 text-sm tracking-wide"
                      >
                        {messages.map((message) => {
                          return (
                            <div
                              ref={scroll}
                              key={message._id}
                              className={`flex flex-col mb-2  ${
                                message.senderId === profileData._id
                                  ? " items-end"
                                  : "items-start"
                              } `}
                            >
                              <div
                                className={` ${
                                  message.senderId === profileData._id
                                    ? "border-slate-30 rounded-br-sm"
                                    : "border-slate-200 rounded-bl-sm"
                                } py-1.5 px-3 border rounded-full max-w-sm `}
                              >
                                {message.textMessage}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {format(message.createdAt)}
                              </div>
                            </div>
                          );
                        })}
                      </section>
                      {/* input_section */}
                      <div className="absolute bottom-2 bg-white left-0 w-full px-3 ">
                        <div className="flex w-full items-center">
                          <InputEmojiWithRef
                            value={chatMessage}
                            onChange={setChatMessage}
                            cleanOnEnter
                            onEnter={() => handleSubmit(item._id)}
                            placeholder="Type a message"
                          />
                          <TbSend
                            onClick={() => handleSubmit(item._id)}
                            className="cursor-pointer text-4xl text-slate-500 p-1 rounded-full "
                          />
                          <input type="file" id="file" className="hidden" />
                        </div>
                      </div>
                    </section>
                  )
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOC(Friends);
