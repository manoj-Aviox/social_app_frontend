import React, { useEffect } from "react";
import { BiRefresh } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "../Components/FeedCard";
import UserCard from "../Components/UserCard";
import HOC from "../Layouts/HOC";
import { GetFeeds } from "../Redux/Actions/FeedAction";
import { GetAllUsers } from "../Redux/Actions/UserAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const allusersData = useSelector((item) => item.UserReducer.alluser);
  const profileData = useSelector((item) => item.UserReducer.profile);
  const feedsData = useSelector((item) => item.FeedReducer.allFeed);

  useEffect(() => {
    dispatch(GetAllUsers());
    dispatch(GetFeeds());
  }, [dispatch]);
  return (
    <div className="bg-gray-100  ">
      <section className="container justify-between  lg:flex-row flex-col flex gap-3 mx-auto py-8 px-4 ">
        {/* Main feeds */}
        <div className="lg:w-3/5 w-full  relative px-2   rounded-b overflow-y-auto">
          {/* <div className="py-4  text-xl font-bold ">Feeds</div> */}
          <div className="">
            {feedsData?.map((item) => {
              return <FeedCard alluser={allusersData} data={item} />;
            })}
          </div>
        </div>
        {/* Aside Bar */}
        <div className="lg:w-2/5  w-full ">
          <div className="p-3 font-medium rounded-t-sm flex items-center justify-between bg-white ">
            <div className=""> Who to follow</div>
            <BiRefresh
              onClick={() => dispatch(GetAllUsers())}
              className="text-2xl cursor-pointer"
            />
          </div>
          <div className="flex flex-col  items-center rounded-b-lg border-t shadow-sm bg-white overflow-hidden">
            {allusersData?.map((item) => {
              return profileData._id !== item._id && <UserCard data={item} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HOC(Dashboard);
