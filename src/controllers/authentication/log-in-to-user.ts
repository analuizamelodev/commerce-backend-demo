import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { getUserByEmailService } from "../../services/authentication/get-user-by-email";
const SECRET = "my_super_secret_key";

export const logInToUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await getUserByEmailService(email);

  if (user && user.password === password) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials" });
};
