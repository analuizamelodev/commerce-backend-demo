import { Request, Response } from "express";
import { getTransactionByIdService } from "../../services/transaction/get-transaction-by-id";

export const getTransactionByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const transaction = await getTransactionByIdService(Number(id));

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
