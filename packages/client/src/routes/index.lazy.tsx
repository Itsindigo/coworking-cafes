import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { trpc } from "../trpc";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

export default function Index() {
  // const userQuery = trpc.userList.useQuery();

  // if (userQuery.isLoading) {
  //   return <p>Loading...</p>;
  // }

  return <h1 className="text-3xl font-bold underline">Hello World</h1>;
}
