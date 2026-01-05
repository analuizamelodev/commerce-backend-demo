import { Request, Response } from "express";
import { deleteProductByIdService } from "../../services/product/delete-product-by-id";

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProductByIdService(Number(id));

    return res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
