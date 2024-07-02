import React from "react";
import { Link } from "@tanstack/react-router";

interface LinkButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  children,
  className,
}) => {
  return (
    <Link
      to={to}
      className={`px-4 py-2 bg-gray-400 text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
