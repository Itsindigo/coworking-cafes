import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "../pages/login";
import { z } from "zod";
import { WarningReasons } from "../components/WarningBanner";

export const Route = createFileRoute("/user/login")({
  component: () => <LoginPage />,
  validateSearch: (search) => {
    z.object({
      wa: z
        .string()
        .refine(
          (val) => {
            return Object.values(WarningReasons).includes(
              val as WarningReasons,
            );
          },
          {
            message: "Invalid warning reason",
          },
        )
        .optional(),
      prev: z.string().optional(),
    }).parse(search);
  },
  errorComponent: ({ error }) => {
    return <div>Something went wrong</div>;
  },
});
