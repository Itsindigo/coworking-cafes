import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import "./App.css";
import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/react-query";
import HomePage from "./pages/home";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4444/trpc",
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
