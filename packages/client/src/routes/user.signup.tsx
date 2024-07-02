import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/signup")({
  component: () => <div>Hello /user/signup!</div>,
});
