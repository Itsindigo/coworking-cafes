import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import IndexPage from "../pages/index";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

export default function Index() {
  return <IndexPage />;
}
