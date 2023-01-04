import React, { Fragment, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout, TbMessageCircle2 } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../Redux/Actions/UserAction";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector((item) => item.UserReducer.profile);
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logges Out Success");
    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/", icon: <AiFillHome /> },
    { name: "Messages", path: "/messages", icon: <TbMessageCircle2 /> },
    { name: "Profile", path: "/me", icon: <CgProfile /> },
  ];

  useEffect(() => {
    dispatch(GetProfile());
  }, [dispatch]);

  return (
    <>
      <header
        id="page-header"
        className="relative h-full  top-0 left-0 items-center bg-white z-20 p-3 z-1"
      >
        {/* Logo */}
        <div className="flex p-2  items-center">
          <Link
            to="/"
            className="group inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-gray-700 hover:text-blue-600 active:text-gray-700"
          >
            <img src="./Images/Logo.png" alt="coderbook" width={30} />

            <span>Coderbook</span>
          </Link>
        </div>
        {/* NavLinks */}
        <div className="flex mt-10 flex-col gap-6">
          {links.map((item) => {
            return (
              <div
                onClick={() => navigate(item.path)}
                className={`flex ${
                  item.path === window.location.pathname && "text-blue-500"
                }   items-center gap-3 cursor-pointer`}
              >
                <div className="text-xl"> {item.icon}</div>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
        {/* Bottom */}
        <div className="absolute bg-white flex shadow-md items-center gap-2 border-t bottom-0 left-0 w-full p-3">
          <div className="w-10 h-10">
            {profileData?.profilePicture ? (
              <img
                src={`${process.env.REACT_APP_IMAGES_BASE_URL}${profileData?.profilePicture}`}
                alt={profileData?.name}
                className="w-10 h-10 object-top object-cover shadow-md rounded-full"
              />
            ) : (
              <svg
                className="hi-solid hi-user-circle shadow-md rounded-full inline-block w-full h-full opacity-50"
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
          </div>
          <div className="flex flex-col tracking-wider text-xs">
            <span
              onClick={() => navigate("/me")}
              className="text-sm uppercase cursor-pointer text-blue-600 font-bold"
            >
              {profileData?.name}
            </span>
            <span className="text-slate-800 font-semibold">
              {profileData?.username}
            </span>
          </div>
          <div className="ml-auto text-2xl text-blue-600 cursor-pointer">
            <TbLogout onClick={handleLogout} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
