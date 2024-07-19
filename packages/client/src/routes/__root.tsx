import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, trpc, trpcClient } from "../trpc";
import { Navbar, TanStackRouterDevtools } from "../components";
import { GOOGLE_CLIENT_ID } from "../constants";
import { AuthProvider } from "../contexts/auth";

export const Route = createRootRoute({
  component: () => {
    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <Navbar />
              <Outlet />
              <TanStackRouterDevtools />
            </GoogleOAuthProvider>
          </AuthProvider>
        </QueryClientProvider>
      </trpc.Provider>
    );
  },
});
