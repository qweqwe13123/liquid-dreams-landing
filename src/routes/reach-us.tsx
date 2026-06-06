import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/reach-us")({
  beforeLoad: () => {
    throw redirect({ to: "/contact" });
  },
});
