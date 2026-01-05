import { Request } from "express";
import { validateToken } from "../authentication/auth/validate-token";

export const getUserFromToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { valid: false, error: "Token not provided" };
  }

  const token = authHeader.split(" ")[1];
  const validation = validateToken(token);

  if (!validation.valid) {
    return { valid: false, error: "Invalid or expired token" };
  }

  const user = validation.decoded as { id: number; email: string };
  return { valid: true, user };
};
