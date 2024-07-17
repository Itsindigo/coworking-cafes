import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../contexts/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/user/logout")({
  component: () => {
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();

    useEffect(() => {
      logout();
    }, [logout]);

    useEffect(() => {
      if (!isLoggedIn) {
        navigate({ to: "/" });
      }
    }, [isLoggedIn, navigate]);

    return null;
  },
});
