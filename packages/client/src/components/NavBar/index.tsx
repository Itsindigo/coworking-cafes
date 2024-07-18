import React from "react";
import { Link } from "@tanstack/react-router";
import LinkButton from "../LinkButton";
import ProfileMenu from "../ProfileMenu";
import SVGImage from "../SVG";
import { useAuth } from "../../contexts/auth";

export const Navbar: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="shrink-0">
          <Link to="/" className="text-lg font-semibold text-white">
            <SVGImage src="/favicon.svg" />
          </Link>
        </div>
        <div className="text-white">Placeholder Title</div>
        <div className="shrink-0">
          {isLoggedIn ? (
            <ProfileMenu />
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
