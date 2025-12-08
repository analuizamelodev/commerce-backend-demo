import { Request, Response } from "express";
import { getAllProductsService } from "../../services/product/get-all-products";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
