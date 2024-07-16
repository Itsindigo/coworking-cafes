import { TRPCError } from "@trpc/server";
import logger from "../../logger.js";
import { router, publicProcedure } from "../trpc.js";
import { z } from "zod";
import { UserSource } from "../../dao/user/index.js";

export const getUserAuthRouter = () =>
  router({
    googleAuthRedirect: publicProcedure
      .input(z.object({ credential: z.string() }))
      .mutation(async ({ input: { credential }, ctx: { services } }) => {
        try {
          const {
            email,
            given_name: givenName,
            family_name: familyName,
          } = await services.googleAuth.decodeGoogleToken(credential);

          await services.user.getOrCreateUser({
            email,
            givenName,
            familyName,
            source: UserSource.GOOGLE,
          });

          /* Create JWT */

          return { email, givenName, familyName };
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
