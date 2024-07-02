import React from "react";
import { Link } from "@tanstack/react-router";
import LinkButton from "../LinkButton";
import SVGImage from "../SVG";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link to="/" className="text-white text-lg font-semibold">
            <SVGImage src="./src/assets/favicon.svg" />
          </Link>
        </div>
        <div className="flex-shrink-0">
          <LinkButton to="/user/login">Login</LinkButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
