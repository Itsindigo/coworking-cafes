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
      className={`hover:bg-primary-dark focus:ring-primary rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
