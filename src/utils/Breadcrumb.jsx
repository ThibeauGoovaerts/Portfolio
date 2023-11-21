import React from "react";
import { useNavigate } from "react-router-dom";
import { Truncate } from "./TruncateText";
import { BiHomeAlt } from "react-icons/bi";

// Located at the top of the page Breadcrumb navigation
const Breadcrumb = ({ location, name }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex rounded-lg truncate" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              window.scrollTo(0, 0);
            }}
            className="text-md text-dark dark:text-white inline-flex items-center"
          >
            <BiHomeAlt />
          </a>
        </li>
        {location && (
          <li>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href={`/${location.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${location.toLowerCase()}`);
                  window.scrollTo(0, 0);
                }}
                className="text-md breadcrumb-icon ml-1 md:ml-2 text-sm font-medium"
              >
                {location}
              </a>
            </div>
          </li>
        )}
        {name && (
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 md:ml-2 text-sm font-medium text-zinc-400">
                {name && Truncate(name, 60)}
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
