import React from "react";
import { trpc } from "../trpc";

export default function HomePage() {
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
