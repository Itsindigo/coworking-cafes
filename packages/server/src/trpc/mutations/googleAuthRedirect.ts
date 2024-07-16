import { TRPCError } from "@trpc/server";
import logger from "../../logger.js";
import { createGoogleAuthService } from "../../services/googleAuth/index.js";

export const googleAuthRedirectMutation = async ({
  input: { credential },
}: {
  input: { credential: string };
}) => {
  try {
    const googleAuthService = createGoogleAuthService();
    const data = await googleAuthService.decodeGoogleToken(credential);

    console.log({ data });

    return data;
  } catch (err) {
    logger.error({ err }, "Failed to authenticate with Google");
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
      cause: String(err),
    });
  }
};
