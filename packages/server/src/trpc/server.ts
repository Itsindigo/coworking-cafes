import { router } from "./trpc.js";
import { getUserAuthRouter } from "./routers/userAuth.js";

export const appRouter = router({
  userAuth: getUserAuthRouter(),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
