import { Link } from "@tanstack/react-router";
import React from "react";

interface TextLinkProps {
  to: string;
  children: React.ReactNode;
}

export const TextLink = ({ children, to }: TextLinkProps) => (
  <Link to={to} className="text-white underline">
    {children}
  </Link>
);

export default TextLink;
