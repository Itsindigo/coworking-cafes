import { router } from "./trpc.js";
import { getUserAuthRouter } from "./routers/userAuth.js";
import { getUserRouter } from "./routers/user.js";

export const appRouter = router({
  userAuth: getUserAuthRouter(),
  user: getUserRouter(),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
