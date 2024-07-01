import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/trpc/server";

export const trpc = createTRPCReact<AppRouter>();
