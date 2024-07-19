import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createTRPCQueryUtils } from "@trpc/react-query";
import { queryClient, trpcClient } from "../trpc";
import { UserSettingsPage } from "../pages/userSettings";

export const Route = createFileRoute("/user/settings")({
  component: () => <UserSettingsPage />,
  loader: async (ctx) => {
    const clientUtils = createTRPCQueryUtils({
      queryClient,
      client: trpcClient,
    });

    const { user } = await clientUtils.user.getMe.ensureData();

    return {
      user,
    };
  },
});
