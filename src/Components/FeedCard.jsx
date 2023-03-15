import React from "react";
import { TbDots } from "react-icons/tb";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { LikeFeed } from "../Redux/Actions/FeedAction";

const FeedCard = ({ data, alluser }) => {
  const dispatch = useDispatch();

  return alluser.map((item) => {
    return (
      item._id === data.user_id && (
        <div className="rounded-sm bg-white mb-10 shadow-md">
          {/* Top */}
          <div
            className=" px-3 py-2 border-b  bg-white flex items-center gap-3
 rounded-t"
          >
            <div className="w-10 h-10  shadow-sm rounded-full">
              <img
                src={item.profilePicture}
                alt={item.name}
                className="rounded-full w-full h-full  object-cover object-top"
              />
            </div>
            <span className=" font-medium">{item.username}</span>
            <div className="ml-auto text-xl cursor-pointer">
              <TbDots />
            </div>
          </div>

          {/* Image */}
          <figure>
            <img src={data?.img} alt={data.title} className="w-full" />
          </figure>
          {/* Content */}
          <div className="p-3 text-sm">
            <div className="flex gap-10 mb-0">
              <div className="flex gap-2 items-center">
                <div
                  onClick={() => dispatch(LikeFeed(data._id,item._id))}
                  className="text-xl cursor-pointer"
                >
                  <AiOutlineLike />
                </div>
                <span className="text-base"> {data.likes.length} Likes</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-xl cursor-pointer">
                  <AiOutlineComment />
                </div>
                <span className="text-base"> Comment</span>
              </div>
            </div>
          </div>
        </div>
      )
    );
  });
};

export default FeedCard;
