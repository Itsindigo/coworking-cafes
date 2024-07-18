import React from "react";
import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const ProfileMenu: React.FC = () => {
  const navLinks = [
    {
      title: "Settings",
      url: "#",
    },
    {
      title: "Logout",
      url: "/user/logout",
    },
  ];

  return (
    <div className="relative flex items-center">
      <div className="group relative">
        <FontAwesomeIcon
          icon={faUser}
          className="text-blue h-6 w-6 cursor-pointer rounded-full border-2 border-white p-2 text-white"
        />
        <div className="absolute right-0 mt-2 w-32 rounded-md bg-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          {navLinks.map((link, index) => (
            <Link
              key={`nav-${index}`}
              className="block border-b border-gray-300 px-4 py-2 text-gray-800 first:rounded-t-md last:rounded-b-md hover:bg-gray-200 focus-visible:ring-2"
              to={link.url}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
