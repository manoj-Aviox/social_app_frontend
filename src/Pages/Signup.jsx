import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateAccount } from "../Redux/Actions/Authorization";

const Signup = () => {
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form_input =
    "block border outline-none  border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50";
  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      CreateAccount(formValues, () => {
        navigate("/login");
      })
    );
  };

  return (
    <>
      <div
        id="page-container"
        className="flex flex-col absolute top-0 left-0 mx-auto w-full min-h-screen bg-gray-100"
      >
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
          <div className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
            <div className="pattern-dots-md text-gray-300 absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 transform translate-x-16 translate-y-16" />
            <div className="pattern-dots-md text-gray-300 absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 transform -translate-x-16 -translate-y-16" />

            <div className="py-6 lg:py-0 w-full md:w-9/12 lg:w-8/12 xl:w-7/12 relative">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold inline-flex items-center mb-1 space-x-3">
                  <img src="./Images/Logo.png" alt="coderbook" width={40} />
                  <span>Coderbook</span>
                </h1>
                <p className="text-gray-500">
                  Welcome, please create your Account{" "}
                </p>
              </div>

              <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                <div className="p-5 lg:p-6 grow w-full">
                  <div className="sm:p-5 lg:px-10 lg:py-8">
                    <form
                      onSubmit={handleSubmit}
                      className="gap-3 grid md:grid-cols-2"
                    >
                      <div className="space-y-1">
                        <label
                          htmlFor="name"
                          name="name"
                          className="font-medium"
                        >
                          Name
                        </label>
                        <input
                          className={form_input}
                          type="text"
                          id="name"
                          required
                          name="name"
                          value={formValues?.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="username"
                          name="username"
                          className="font-medium"
                        >
                          User Name
                        </label>
                        <input
                          className={form_input}
                          type="text"
                          id="username"
                          required
                          name="username"
                          value={formValues?.username}
                          onChange={handleChange}
                          placeholder="Enter your username"
                        />
                      </div>
                     
                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          name="email"
                          className="font-medium"
                        >
                          Email
                        </label>
                        <input
                          className={form_input}
                          type="email"
                          id="email"
                          required
                          name="email"
                          value={formValues?.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="password"
                          name="email"
                          className="font-medium"
                        >
                          Password
                        </label>
                        <input
                          className={form_input}
                          type="password"
                          id="password"
                          required
                          value={formValues?.password}
                          onChange={handleChange}
                          name="password"
                          placeholder="Enter your password"
                        />
                      </div>
                      <div className=" md:col-span-2 mt-2">
                        <button
                          type="submit"
                          className="flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-800 hover:border-blue-800 focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="py-4 px-5 lg:px-6 w-full text-sm text-center bg-gray-50">
                  Already have an account ?
                  <Link
                    className="font-medium text-blue-600 pl-1 hover:text-blue-400"
                    to="/login"
                  >
                    Log In Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Signup;
