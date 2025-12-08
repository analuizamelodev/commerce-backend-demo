import { Request, Response } from "express";
import { deleteProductByIdService } from "../../services/product/delete-product-by-id";
import { getUserFromToken } from "../../services/utils/get-user-from-token";

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { valid, user, error } = getUserFromToken(req);

    if (!valid || !user) {
      return res.status(401).json({ error: error || "Unauthorized access" });
    }
    const { id } = req.params;
    await deleteProductByIdService(Number(id));

    return res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
