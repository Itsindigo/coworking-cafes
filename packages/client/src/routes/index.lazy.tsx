import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { trpc } from "../trpc";
import HeroBanner from "../components/HeroBanner";
import HighContrastText from "../components/HighContrastText";
import { IndexPage } from "../pages/index";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

export default function Index() {
  // const userQuery = trpc.userList.useQuery();

  // if (userQuery.isLoading) {
  //   return <p>Loading...</p>;
  // }

  return <IndexPage />;
}
