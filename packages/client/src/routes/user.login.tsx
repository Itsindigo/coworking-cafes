import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "../pages/login";

export const Route = createFileRoute("/user/login")({
  component: () => <LoginPage />,
});
