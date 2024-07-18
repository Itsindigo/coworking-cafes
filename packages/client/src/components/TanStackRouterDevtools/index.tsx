import React, { Suspense } from "react";
import { TanStackRouterDevtools as TSRD } from "@tanstack/router-devtools";

export const TanStackRouterDevtools = () => {
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

  return (
    <Suspense>
      <TSRD />
    </Suspense>
  );
};

export default TanStackRouterDevtools;
