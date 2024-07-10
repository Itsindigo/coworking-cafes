import { TRPCError } from "@trpc/server";
import { createGoogleAuthService } from "../../services/googleAuth/index.js";
import { router, publicProcedure } from "../trpc.js";
import { z } from "zod";
import logger from "../../logger.js";

export const getUserAuthRouter = () =>
  router({
    googleAuth: publicProcedure
      .input(z.object({ credential: z.string() }))
      .mutation(async ({ input: { credential } }) => {
        try {
          const googleAuthService = createGoogleAuthService();
          const data = await googleAuthService.decodeGoogleToken(credential);
          return data;
        } catch (err) {
          logger.error({ err }, "Failed to authenticate with Google");
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred, please try again later.",
            cause: String(err),
          });
        }
      }),
  });
