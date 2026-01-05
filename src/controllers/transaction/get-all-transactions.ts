import { Request, Response } from "express";
import { getAllTransactionsService } from "../../services/transaction/get-all-transactions";

export const getAllTransactionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const transactions = await getAllTransactionsService();
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
