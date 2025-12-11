import { Request, Response } from "express";
import { createTransactionService } from "../../services/transaction/create-transaction";
import { getUserFromToken } from "../../services/utils/get-user-from-token";

export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { valid, user, error } = getUserFromToken(req);

    if (!valid || !user) {
      return res.status(401).json({ error: error || "Unauthorized access" });
    }
    const { type, products } = req.body;

    const { transaction, items } = await createTransactionService(
      type,
      products
    );

    return res.status(201).json({ transaction, items });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
