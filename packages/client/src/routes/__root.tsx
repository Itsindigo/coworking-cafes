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
      <QueryClientProvider client={queryClient}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <AuthProvider>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <Navbar />
              <Outlet />
              <TanStackRouterDevtools />
            </GoogleOAuthProvider>
          </AuthProvider>
        </trpc.Provider>
      </QueryClientProvider>
    );
  },
});
