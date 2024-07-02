import React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/location/create")({
  component: () => <div>Hello /location/create!</div>,
});
