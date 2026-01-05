import { Request, Response } from "express";
import { deleteTransactionByIdService } from "../../services/transaction/delete-transaction-by-id";

export const deleteTransactionByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteTransactionByIdService(Number(id));

    return res
      .status(200)
      .json({ message: "Transaction successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
