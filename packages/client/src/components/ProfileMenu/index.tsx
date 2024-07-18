import React from "react";
import { Link } from "@tanstack/react-router";

export const ProfileMenu: React.FC = () => {
  return (
    <div className="relative flex items-center">
      <div className="group relative">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
        />
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 first:rounded-t-md last:rounded-b-md border-b border-gray-300 focus-visible:ring-2"
          >
            Settings
          </a>
          <Link
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 first:rounded-t-md last:rounded-b-md border-b border-gray-300 focus-visible:ring-2"
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
