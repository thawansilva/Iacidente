import { NavLink, useLocation } from "react-router-dom";
import { toggleSidebar } from "../assets/js/HelpersFunctions.js";
import { Filters } from "./Filters";

export const NavigationBar = ({ toggleNavbar }) => {
  let location = useLocation();
  return (
    <>
      <button
        title="Abrir navegação"
        onClick={() => {
          toggleSidebar("open");
          toggleNavbar();
        }}
        id="open"
        className="fixed hidden duration-300 ease-in-out rotate-90 hover:text-blue-700 top-6 left-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          strokeWidth={1.5}
          className="w-8 h-8"
        >
          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
        </svg>
      </button>
      <header
        id="sidebar"
        className="fixed top-0 bottom-0 w-[275px] sm:w-[340px] bg-blue-700 sidebar overflow-y-auto text-gray-100 duration-300 ease-in-out z-[2]"
      >
        <div className="relative px-4 py-12">
          {/* Close icon */}
          <button
            title="Fechar"
            onClick={() => {
              toggleSidebar("close");
              toggleNavbar();
            }}
            id="close"
            className="absolute text-white duration-300 ease-in-out cursor-pointer top-3 right-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* Navbar */}
          <nav>
            <h2 className="text-3xl font-bold">IAcidente</h2>
            <hr className="my-2" />
            <ul>
              <li className="">
                <NavLink
                  to="/"
                  className={`${(isActive) => isActive && "active"} link`}
                >
                  Home
                </NavLink>
              </li>
              <li className="my-1">
                <NavLink
                  to="/visaogeral"
                  className={`${(isActive) => isActive && "active"} link`}
                >
                  Visão Geral
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* Show the filter if it's not in home page */}
          {location.pathname != "/" && (
            <div>
              <hr className="my-3" />
              <Filters />
            </div>
          )}
        </div>
      </header>
    </>
  );
};
