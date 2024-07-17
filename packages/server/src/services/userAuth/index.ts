import jwt from "jsonwebtoken";
import { getConfig } from "../../config.js";
import { EXPIRES_IN_THIRTY_DAYS } from "./constants.js";

export const userAuthServiceFactory = () => {
  const config = getConfig();

  const createAuthToken = ({ email }: { email: string }) => {
    return jwt.sign({ email }, config.crypto.secretKey, {
      expiresIn: EXPIRES_IN_THIRTY_DAYS,
    });
  };

  const verifyAuthToken = (token: string) => {
    return jwt.verify(token, config.crypto.secretKey);
  };

  return {
    createAuthToken,
    verifyAuthToken,
  };
};
