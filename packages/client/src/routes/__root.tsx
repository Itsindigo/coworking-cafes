import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { trpc } from "../trpc";
import { Navbar, TanStackRouterDevtools } from "../components";
import { GOOGLE_CLIENT_ID } from "../constants";
import { AuthProvider } from "../contexts/auth";

export const Route = createRootRoute({
  component: () => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: "http://localhost:4444/trpc",
            async headers() {
              return {
                // Todo
              };
            },
          }),
        ],
      })
    );

    return (
      <AuthProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
              <Navbar />
              <Outlet />
              <TanStackRouterDevtools />
            </QueryClientProvider>
          </trpc.Provider>
        </GoogleOAuthProvider>
      </AuthProvider>
    );
  },
});
