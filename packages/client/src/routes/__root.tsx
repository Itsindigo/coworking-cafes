import React, { useState } from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { trpc } from "../trpc";
import { LinkButton, TanStackRouterDevtools } from "../components";

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
      <>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <div className="p-2 flex justify-end gap-2">
              <LinkButton to="/">Sign In</LinkButton>
            </div>
            <Outlet />
            <TanStackRouterDevtools />
          </QueryClientProvider>
        </trpc.Provider>
      </>
    );
  },
});
