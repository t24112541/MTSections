import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';
import fs from 'fs'

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
) => {

  const privateKey = fs.readFileSync(config.get<string>(keyName), { encoding: "utf8" })

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {

    const publicKey = fs.readFileSync(config.get<string>(keyName), { encoding: "utf8" })
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
