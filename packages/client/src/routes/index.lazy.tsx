import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { trpc } from "../trpc";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

export default function Index() {
  const userQuery = trpc.userList.useQuery();

  if (userQuery.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {userQuery.data?.length ? (
        <ul>
          {userQuery.data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
