import { JwksClient } from "jwks-rsa";
import fetch from "node-fetch";
import jwt, { type JwtHeader, type SigningKeyCallback } from "jsonwebtoken";
import { getConfig } from "../../config.js";
import { GOOGLE_INFO } from "../../constants.js";
import type { JWKSet, OpenIDConfiguration } from "./types.js";

export const createGoogleAuthService = () => {
  async function fetchGoogleOpenIdConfig(): Promise<OpenIDConfiguration> {
    const response = await fetch(GOOGLE_INFO.openIdConfigUrl, {
      headers: { "content-type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Could not fetch Google OpenID config.");
    }

    return response.json() as Promise<OpenIDConfiguration>;
  }

  async function fetchGoogleJwks(uri: string): Promise<JWKSet> {
    const response = await fetch(uri, {
      headers: { "content-type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Could not fetch Google OpenID config.");
    }

    return response.json() as Promise<JWKSet>;
  }

  async function decodeGoogleToken(token: string) {
    const config = getConfig();
    const decoded = jwt.decode(token, { complete: true, json: true });

    if (!decoded) {
      throw new Error("Could not decode JWT.");
    }

    const { payload, header, signature } = decoded;

    if (typeof payload === "string") {
      throw new Error("Expected JWT payload to be a string. Got a string.");
    }

    if (
      payload.aud !== config.google.clientId ||
      payload.iss !== GOOGLE_INFO.jwtIssuer
    ) {
      throw new Error("Id token is not valid");
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
          return reject(new Error(`Could not verify JWT: ${err.message}`));
        }

        return resolve(payload);
      });
    });
  }

  return {
    decodeGoogleToken,
  };
};
