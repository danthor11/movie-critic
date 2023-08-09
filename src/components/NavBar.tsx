"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();
  console.log(status);

  const handleLogout = async () => {
    return await signOut({ callbackUrl: "/" });
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Rate <span className="text-blue-500">It</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            }  w-full md:block md:w-auto`}
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {status === "unauthenticated" && (
                <>
                  <li onClick={() => setIsOpen(false)}>
                    <Link href="/login" className="navbar-link">
                      Sign In
                    </Link>
                  </li>

                  <li onClick={() => setIsOpen(false)}>
                    <Link href="/register" className="navbar-link">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}

              <li onClick={() => setIsOpen(false)}>
                <Link href="/movies" className="navbar-link">
                  Movies
                </Link>
              </li>
              {status === "authenticated" && (
                <>
                  <hr color="gray" className="my-1" />
                  <li onClick={() => setIsOpen(false)}>
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="navbar-link w-full hover:text-white transition-colors bg-red-500 hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
