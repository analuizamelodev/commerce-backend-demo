import { Request, Response } from "express";
import { getProductByIdService } from "../../services/product/get-product-by-is";

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(Number(id));

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
