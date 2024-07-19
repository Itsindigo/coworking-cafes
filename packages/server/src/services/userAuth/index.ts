import jwt from "jsonwebtoken";
import { getConfig } from "../../config.js";
import { EXPIRES_IN_THIRTY_DAYS, THIRTY_DAYS_MS } from "./constants.js";
import { z } from "zod";

const tokenSchema = z.object({
  email: z.string(),
  id: z.string().uuid(),
  username: z.string(),
});

export const userAuthServiceFactory = () => {
  const config = getConfig();

  const createAuthToken = ({
    email,
    username,
    id,
  }: {
    email: string;
    username: string;
    id: string;
  }): { token: string; expiresAt: Date } => {
    const token = jwt.sign({ email, username, id }, config.crypto.secretKey, {
      expiresIn: EXPIRES_IN_THIRTY_DAYS,
    });

    const expiresAt = new Date(Date.now() + THIRTY_DAYS_MS);

    return { token, expiresAt };
  };

  const verifyAuthToken = (token: string) => {
    const verifiedToken = jwt.verify(token, config.crypto.secretKey);
    const parsedToken = tokenSchema.parse(verifiedToken);

    return parsedToken;
  };

  return {
    createAuthToken,
    verifyAuthToken,
  };
};
