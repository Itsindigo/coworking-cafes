import jwt from "jsonwebtoken";
import { getConfig } from "../../config.js";
import { EXPIRES_IN_THIRTY_DAYS, THIRTY_DAYS_MS } from "./constants.js";

export const userAuthServiceFactory = () => {
  const config = getConfig();

  const createAuthToken = ({
    email,
  }: {
    email: string;
  }): { token: string; expiresAt: Date } => {
    const token = jwt.sign({ email }, config.crypto.secretKey, {
      expiresIn: EXPIRES_IN_THIRTY_DAYS,
    });

    const expiresAt = new Date(Date.now() + THIRTY_DAYS_MS);

    return { token, expiresAt };
  };

  const verifyAuthToken = (token: string) => {
    return jwt.verify(token, config.crypto.secretKey);
  };

  return {
    createAuthToken,
    verifyAuthToken,
  };
};
