import { Request, Response } from "express";
import { getUserByEmailService } from "../../services/authentication/get-user-by-email";
import { createUserService } from "../../services/authentication/create-user";

export const registerUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await getUserByEmailService(email);
  if (!user) {
    await createUserService(name, email, password);

    return res.status(201).json({ message: "User successfully registered" });
  }

  res.status(400).json({ error: "User already exists" });
};
