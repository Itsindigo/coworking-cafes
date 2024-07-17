import React from "react";
import { Link } from "@tanstack/react-router";
import LinkButton from "../LinkButton";
import SVGImage from "../SVG";
import { useAuth } from "../../contexts/auth";

export const Navbar: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link to="/" className="text-white text-lg font-semibold">
            <SVGImage src="/favicon.svg" />
          </Link>
        </div>
        <div className="text-white">Placeholder Title</div>
        <div className="flex-shrink-0">
          {isLoggedIn ? (
            <LinkButton className="bg-black" to="/user/logout">
              Logout
            </LinkButton>
          ) : (
            <LinkButton className="bg-black" to="/user/login">
              Login
            </LinkButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
