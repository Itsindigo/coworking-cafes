import { initTRPC, TRPCError } from "@trpc/server";
import type { TrpcContext } from "./context.js";
import { getConfig } from "../config.js";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.context<TrpcContext>().create({
  errorFormatter: (opts) => {
    const {
      debug: { enableStackTraceResponses },
    } = getConfig();
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        message: shape.message,
        code: shape.code,
        stack: enableStackTraceResponses ? error.stack : undefined,
      },
    };
  },
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
