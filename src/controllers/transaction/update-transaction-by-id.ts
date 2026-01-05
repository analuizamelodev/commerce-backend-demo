import { Request, Response } from "express";
import { updateTransactionByIdService } from "../../services/transaction/update-transaction-by-id";

export const updateTransactionByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    await updateTransactionByIdService(Number(id), type);

    return res
      .status(200)
      .json({ message: "Transaction successfully updated" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
