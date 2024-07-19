import React from "react";
import { Route } from "../../routes/user.settings";

export const UserSettingsPage: React.FC = () => {
  const {
    user: { email, id, username },
  } = Route.useLoaderData({
    select: (data) => {
      return data;
    },
  });

  return (
    <ul>
      <li>{email}</li>
      <li>{id}</li>
      <li>{username}</li>
    </ul>
  );
};
