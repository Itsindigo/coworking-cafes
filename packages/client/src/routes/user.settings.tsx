import React from "react";
import {
  createFileRoute,
  ErrorComponentProps,
  Navigate,
} from "@tanstack/react-router";
import { createTRPCQueryUtils, TRPCClientError } from "@trpc/react-query";
import { queryClient, trpcClient } from "../trpc";
import { SettingsPage } from "../pages/userSettings";
import { TRPC_ERROR_CODES_BY_KEY } from "../trpc/codes";
import { WarningReasons } from "../components/WarningBanner";

export const Route = createFileRoute("/user/settings")({
  component: () => <SettingsPage />,
  loader: async (ctx) => {
    const clientUtils = createTRPCQueryUtils({
      queryClient,
      client: trpcClient,
    });
    const { user } = await clientUtils.user.getMe.ensureData(undefined, {});

    return {
      user,
    };
  },
  errorComponent: ({ error }) => {
    const trpcError = error as TRPCClientError<any>;
    if (trpcError.data.code === TRPC_ERROR_CODES_BY_KEY.UNAUTHORIZED) {
      return (
        <Navigate
          to="/user/login"
          search={{
            warning: WarningReasons.UNAUTHORIZED,
            prev: "the user settings page",
          }}
        />
      );
    }
    return <Navigate to="/" />;
  },
});
