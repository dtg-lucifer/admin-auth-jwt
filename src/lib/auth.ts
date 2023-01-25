import { jwtVerify } from "jose";

export interface UserJWTPayload {
  jti: string;
  iat: number;
}

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) throw new Error("JWT_SECRET is not set");

  return secret;
};

export const verifyToken = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecret())
    );
    return verified.payload as UserJWTPayload;
  } catch (error) {
    throw new Error("Your token has been expired or invalid");
  }
};
