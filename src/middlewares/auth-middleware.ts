import { Request, Response, NextFunction } from "express";
import { validateToken } from "../services/authentication/auth/validate-token";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const [, token] = authHeader.split(" ");
  const validation = validateToken(token);

  if (validation.valid) {
    const user = validation.decoded as { id: number; email: string };
    req.user = {
      id: String(user.id),
      email: user.email,
    };
  }

  next();
};
