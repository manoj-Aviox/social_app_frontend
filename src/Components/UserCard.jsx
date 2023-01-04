import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SendCHAT } from "../Redux/Actions/ChatsAction";
import {
  AcceptFriendsRequest,
  CancelFriendsRequest,
 
  RejectFriendsRequest,
  SendFriendsRequest,
} from "../Redux/Actions/UserAction";

const UserCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileData = useSelector((item) => item.UserReducer.profile);
  const handleRequest = (id) => {
    dispatch(SendFriendsRequest(id));
  };

  const handleSubmit = (id) => {
    const payload = {
      receiverId: id,
      senderId: profileData._id,
    };
    dispatch(SendCHAT(payload, () => navigate("/messages")));
  };
  // conditonal button
  const Buttons = () => {
    if (data.friends?.includes(profileData._id)) {
      return (
        <>
          <button
            onClick={() => handleSubmit(data?._id)}
            className="rounded-full bg-blue-500 hover:bg-white hover:text-blue-500 text-white py-1 px-2 shadow-md"
          >
            Message
          </button>
        </>
      );
    } else if (profileData.friends?.includes(data?._id)) {
      return (
        <>
          <button className="rounded-full bg-blue-500 hover:bg-white hover:text-blue-500 text-white py-1 px-2 shadow-md">
            View Profile
          </button>
        </>
      );
    } else if (profileData.friendsRequest?.includes(data?._id)) {
      return (
        <>
          <button
            onClick={() => dispatch(AcceptFriendsRequest(data?._id))}
            className="rounded-full bg-blue-500 hover:bg-white hover:text-blue-500 text-white py-1 px-2 shadow-md"
          >
            Accept
          </button>
          <button
            onClick={() => dispatch(RejectFriendsRequest(data?._id))}
            className="rounded-full bg-blue-500 hover:bg-white hover:text-blue-500 text-white py-1 px-2 shadow-md"
          >
            Reject
          </button>
        </>
      );
    } else if (profileData.sendfriendsRequest?.includes(data?._id)) {
      return (
        <button
          onClick={() => dispatch(CancelFriendsRequest(data?._id))}
          className="rounded-full bg-blue-500 hover:bg-white hover:text-blue-500 text-white py-1 px-2 shadow-md"
        >
          Cancel Request
        </button>
      );
    } else {
      return (
        <button
          onClick={() => handleRequest(data?._id)}
          className="rounded-full bg-blue-500 hover:bg-white hover:text-blue-500 text-white py-1 px-2 shadow-md"
        >
          Request
        </button>
      );
    }
  };

  return (
    <div key={data?._id} className="p-2 w-full  mb-3 space-y-4">
      <div className="flex items-center gap-3">
        {data.profilePicture ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            src={`${process.env.REACT_APP_IMAGES_BASE_URL}${data?.profilePicture}`}
            className="w-10 h-10 rounded-full object-cover object-top"
          />
        ) : (
          <svg
            className="hi-solid hi-user-circle inline-block w-12 h-12 opacity-50"
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
        <div className=" text-xs">
          <p className="flex flex-col gap-1">
            <div className="font-medium uppercase  text-blue-400">
              {data?.name}
            </div>
            <div className="lowercase tracking-wider font-medium text-gray-600">
              {data?.username}
            </div>
          </p>
        </div>
        <div className="text-xs flex gap-1.5  ml-auto">{Buttons()}</div>
      </div>
    </div>
  );
};

export default UserCard;
