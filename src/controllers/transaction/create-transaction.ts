import { Request, Response } from "express";
import { createTransactionService } from "../../services/transaction/create-transaction";

export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  try {
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
