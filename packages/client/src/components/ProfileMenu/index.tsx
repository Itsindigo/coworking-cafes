import React from "react";
import { Link } from "@tanstack/react-router";

export const ProfileMenu: React.FC = () => {
  return (
    <div className="relative flex items-center">
      <div className="group relative">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="size-10 cursor-pointer rounded-full border-2 border-white"
        />
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          <a
            href="#"
            className="block border-b border-gray-300 px-4 py-2 text-gray-800 first:rounded-t-md last:rounded-b-md hover:bg-gray-200 focus-visible:ring-2"
          >
            Settings
          </a>
          <Link
            className="block border-b border-gray-300 px-4 py-2 text-gray-800 first:rounded-t-md last:rounded-b-md hover:bg-gray-200 focus-visible:ring-2"
            to="/user/logout"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
