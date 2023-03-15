import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CoverPicture, UpdateProfile } from "../Redux/Actions/UserAction";
import { Dialog, Transition } from "@headlessui/react";
import HOC from "../Layouts/HOC";
import { FiEdit } from "react-icons/fi";
import { AddFeed, GetOwnFeeds } from "../Redux/Actions/FeedAction";

const Profile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((item) => item.UserReducer.profile);
  const feedData = useSelector((item) => item.FeedReducer.ownFeed);
  console.log(feedData);

  const [formValues, setFormValues] = useState({
    name: profileData?.name,
    username: profileData?.username,
    phone: profileData?.phone,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [feedPost, setFeedPost] = useState({});
  const [cover, setCover] = useState(false);

  const form_input =
    "block border outline-none  border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50";
  const closeModal = () => {
    setIsOpen(false);
    setCover(false);
  };
  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]:
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value,
    });
  };
  const handleChange2 = (event) => {
    setFeedPost({
      ...feedPost,
      [event.target.name]:
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value,
    });
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("file", formValues.image);
    if (cover) {
      dispatch(CoverPicture(fd, closeModal));
    } else {
      dispatch(UpdateProfile(fd, closeModal));
    }
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("title", feedPost.title);
    fd.append("desc", feedPost.desc);
    fd.append("file", feedPost.image);
    dispatch(
      AddFeed(
        fd,
        () => {
          setFeedPost({});
          setIsShow(false);
        },
        profileData._id
      )
    );
    event.target.reset();
  };
  useEffect(() => {
    if (profileData._id) {
      dispatch(GetOwnFeeds(profileData._id));
    }
  }, [dispatch, profileData._id]);

  return (
    <main className="profile-page">
      {/* Banner */}
      <section className="relative block h-[370px]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url("${profileData?.coverPicture}")`,
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-60 bg-black"
          >
            <div className="p-4 text-xl flex justify-end cursor-pointer  text-white">
              <FiEdit
                onClick={() => {
                  setCover(true);
                  openModal();
                }}
              />
            </div>
          </span>
        </div>
      </section>
      {/* Box */}
      <section className="relative py-10 bg-blueGray-200">
        <div className="container mx-auto px-4 lg:px-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-48">
            <div className="px-6">
              {/* Image  */}
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <div className="shadow-xl flex justify-center bg-white items-center rounded-full md:h-40 h-36 w-36 md:w-40 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 ">
                      {profileData?.profilePicture ? (
                        <img
                          src={profileData?.profilePicture}
                          alt={profileData?.name}
                          className="w-full h-full object-top object-cover rounded-full"
                        />
                      ) : (
                        <svg
                          className="hi-solid hi-user-circle inline-block w-full h-full opacity-50"
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
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      onClick={openModal}
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {profileData?.friends?.length}
                      </span>
                      <span className="text-sm text-blueGray-400">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {feedData?.length}
                      </span>
                      <span className="text-sm text-blueGray-400">Posts</span>
                    </div>
                    <div className="lg:mr-4 hidden p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {feedData?.map((item) => {
                          const arr = [...item.likes];
                          return arr.length;
                        })}
                      </span>
                      <span className="text-sm text-blueGray-400">Likes</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" my-7 capitalize">
                <h3 className="text-4xl text-center font-semibold leading-normal text-blueGray-700 mb-2">
                  {profileData?.name}
                </h3>
                <div className="text-sm mb-4 text-center leading-normal mt-0 text-blueGray-400 font-bold uppercase">
                  {profileData?.username}
                </div>
                <div className="border-t  pt-4">
                  <h3 className="font-bold  mb-5 uppercase">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {feedData?.length === 0 && (
                      <span className="text-sm text-slate-600">
                        No Posts here
                      </span>
                    )}
                    {feedData?.map((item) => {
                      return (
                        item.user_id === profileData._id && (
                          <>
                            <div class="sm:col-span-2 shadow md:col-span-1 block group relative transition ease-out active:opacity-75 overflow-hidden">
                              <img
                                src={item?.img}
                                alt={item?.title}
                                class="transform object-cover h-full w-full transition ease-out group-hover:scale-110"
                              />
                              <div class="absolute bottom-0 inset-0 bg-black bg-opacity-25 transition ease-out group-hover:bg-opacity-0"></div>
                              <BsThreeDotsVertical className="absolute top-2 right-2  text-white text-xl cursor-pointer" />
                              <div class="p-2 flex items-center justify-center absolute bottom-0 left-0">
                                <div class="py-1.5 px-3 bg-white bg-opacity-95 rounded-3xl text-xs font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600">
                                  {item?.title}
                                </div>
                              </div>
                              <div class="p-2 flex items-center justify-center absolute bottom-0 right-0">
                                <div class="py-1.5 flex items-center px-3 bg-white bg-opacity-95 rounded-3xl text-xs font-semibold uppercase tracking-wide gap-1 transition ease-out group-hover:text-white group-hover:bg-blue-600">
                                  {item?.likes.length} Likes
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      );
                    })}
                  </div>
                  <div className="w-full flex py-10 justify-center">
                    <button
                      onClick={() => setIsShow(true)}
                      type="button"
                      className=" flex items-center gap-1 bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 "
                    >
                      {" "}
                      <AiOutlinePlusCircle className="text-lg text-white" /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Popup to profile photo */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg pb-1.5 mb-4 font-medium leading-6 text-gray-900"
                  >
                    Update {cover ? "Cover" : "Profile"} Photo
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    {/* <div className="space-y-1 mb-3">
                      <label htmlFor="name" name="name">
                        Name
                      </label>
                      <input
                        className={form_input}
                        type="text"
                        id="name"
                        required
                        name="name"
                        placeholder={profileData.name}
                        value={formValues?.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1 mb-3">
                      <label
                        htmlFor="username"
                        name="username"
                        classusername="font-medium"
                      >
                        User Name
                      </label>
                      <input
                        className={form_input}
                        type="text"
                        id="username"
                        required
                        name="username"
                        placeholder={profileData.username}
                        value={formValues?.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1 mb-3">
                      <label
                        htmlFor="phone"
                        name="phone"
                        classphone="font-medium"
                      >
                        Phone
                      </label>
                      <input
                        className={form_input}
                        type="tel"
                        id="phone"
                        required
                        name="phone"
                        placeholder={profileData.phone}
                        value={formValues?.phone}
                        onChange={handleChange}
                      />
                    </div> */}
                    <div className="space-y-1 mb-3">
                      <label
                        htmlFor="image"
                        name="image"
                        classimage="font-medium"
                      >
                        Image
                      </label>
                      <input
                        className={form_input}
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex border-none justify-center rounded-md border outline-none border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200  "
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Popup to feed post */}
      <Transition appear show={isShow} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsShow(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg pb-1.5 mb-4 font-bold leading-6 text-gray-900"
                  >
                    Add Feeds
                  </Dialog.Title>
                  <form onSubmit={handleSubmit2}>
                    <div className="space-y-1 mb-3">
                      <label
                        htmlFor="title"
                        name="title"
                        classusername="font-medium"
                      >
                        Title
                      </label>
                      <input
                        className={form_input}
                        type="text"
                        id="title"
                        required
                        name="title"
                        value={feedPost?.title}
                        onChange={handleChange2}
                      />
                    </div>
                    <div className="space-y-1 mb-3">
                      <label
                        htmlFor="desc"
                        name="desc"
                        classphone="font-medium"
                      >
                        Desc
                      </label>
                      <textarea
                        className={form_input}
                        id="desc"
                        required
                        name="desc"
                        value={feedPost?.desc}
                        onChange={handleChange2}
                      />
                    </div>

                    <div className="space-y-1 mb-3">
                      <label
                        htmlFor="image2"
                        name="image"
                        classimage="font-medium"
                      >
                        Image
                      </label>
                      <input
                        className={form_input}
                        type="file"
                        id="image2"
                        name="image"
                        onChange={handleChange2}
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex border-none justify-center rounded-md border outline-none border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200  "
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
};

export default HOC(Profile);
