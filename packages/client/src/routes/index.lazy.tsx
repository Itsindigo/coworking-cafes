import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { trpc } from "../trpc";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import HighContrastText from "../components/HighContrastText/HighContrastText";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

export default function Index() {
  // const userQuery = trpc.userList.useQuery();

  // if (userQuery.isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <HeroBanner
      backgroundImage="/src/assets/coworking_banner.png"
      Header={
        <HighContrastText
          classNames="ml-4 mt-3"
          text="Don't disrupt your flow. Find spots to work near you."
        />
      }
    />
  );
}
