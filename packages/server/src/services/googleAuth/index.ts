import { JwksClient } from "jwks-rsa";
import fetch from "node-fetch";
import jwt, { type JwtHeader, type SigningKeyCallback } from "jsonwebtoken";
import { getConfig } from "../../config.js";
import { GOOGLE_INFO } from "../../constants.js";
import type {
  DecodedGoogleJwt,
  GoogleJwtPayload,
  OpenIDConfiguration,
} from "./types.js";
import { JWTVerificationError } from "../../exceptions.js";

export const googleAuthServiceFactory = () => {
  async function fetchGoogleOpenIdConfig(): Promise<OpenIDConfiguration> {
    const response = await fetch(GOOGLE_INFO.openIdConfigUrl, {
      headers: { "content-type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Could not fetch Google OpenID config.");
    }

    return response.json() as Promise<OpenIDConfiguration>;
  }

  async function decodeGoogleToken(token: string): Promise<GoogleJwtPayload> {
    const config = getConfig();
    const decoded = jwt.decode(token, {
      complete: true,
      json: true,
    }) as DecodedGoogleJwt;

    if (!decoded) {
      throw new JWTVerificationError("Could not decode JWT.");
    }

    const { payload } = decoded;

    if (typeof payload === "string") {
      throw new JWTVerificationError(
        "Expected JWT payload to be a valid JSON object. Got a string."
      );
    }

    if (
      payload.aud !== config.google.clientId ||
      payload.iss !== GOOGLE_INFO.jwtIssuer
    ) {
      throw new JWTVerificationError("Id token is not valid");
    }

    const { jwks_uri: jwksUri } = await fetchGoogleOpenIdConfig();

    const jwksClientInstance = new JwksClient({
      jwksUri,
    });

    const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
      jwksClientInstance.getSigningKey(header.kid, (err, key) => {
        if (err) {
          return callback(err);
        }

        if (!key) {
          return callback(new Error("Invalid token"), undefined);
        }

        const signingKey = key.getPublicKey();

        callback(null, signingKey);
      });
    };

    return new Promise((resolve, reject) => {
      jwt.verify(token, getKey, (err) => {
        if (err) {
          return reject(new JWTVerificationError(err.message, err.stack));
        }

        return resolve(payload);
      });
    });
  }

  return {
    decodeGoogleToken,
  };
};
