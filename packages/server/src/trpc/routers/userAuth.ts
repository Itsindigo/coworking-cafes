import { router, publicProcedure } from "../trpc.js";
import { z } from "zod";

export const getUserAuthRouter = () =>
  router({
    googleAuth: publicProcedure
      .input(z.object({ credential: z.string() }))
      .mutation(() => {
        return [];
      }),
  });
