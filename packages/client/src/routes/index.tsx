import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import IndexPage from "../pages/index/index";

export const Route = createFileRoute("/")({
  component: () => <IndexPage />,
});
