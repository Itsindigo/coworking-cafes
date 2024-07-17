import { TRPCError } from "@trpc/server";
import logger from "../../logger.js";
import { router, publicProcedure } from "../trpc.js";
import { z } from "zod";
import { UserSource } from "../../dao/user/index.js";
import {
  AUTH_COOKIE_NAME,
  THIRTY_DAYS_MS,
} from "../../services/userAuth/constants.js";

export const getUserAuthRouter = () =>
  router({
    googleAuthRedirect: publicProcedure
      .input(z.object({ credential: z.string() }))
      .mutation(
        async ({ input: { credential }, ctx: { services, cookies } }) => {
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

            const jwt = services.userAuth.createAuthToken({ email });

            cookies.set(AUTH_COOKIE_NAME, jwt, {
              httpOnly: true,
              secure: false,
              maxAge: THIRTY_DAYS_MS,
            });

            return { email, givenName, familyName };
          } catch (err) {
            logger.error({ err }, "Failed to authenticate with Google");
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "An unexpected error occurred, please try again later.",
              cause: String(err),
            });
          }
        }
      ),
  });
