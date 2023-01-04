import React from "react";

const Footer = () => {
  return (
    <>
      <footer id="page-footer" className="flex flex-none items-center bg-white">
        <div className="text-center flex flex-col md:text-left md:flex-row md:justify-between text-sm container xl:max-w-7xl mx-auto px-4 lg:px-8">
          <div className="pt-4 pb-1 md:pb-4">
            <span
              className="font-medium text-blue-600 hover:text-blue-400"
            >
              Coderbook
            </span>{" "}
            ©
          </div>
          <div className="pb-4 pt-1 md:pt-4 inline-flex items-center justify-center">
            <span>Crafted with</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-1 text-red-600 hi-solid hi-heart inline-block w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {" "}
              by{" "}
              <span
                className="font-medium text-blue-600 hover:text-blue-400"
              >
                coder_manoj
              </span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
