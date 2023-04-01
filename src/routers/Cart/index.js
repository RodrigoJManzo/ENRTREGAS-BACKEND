import { Router } from "express";
import {
  addProductToCart,
  getCart,
  deleteProductById,
  cartBuy,
} from "../../controllers/index.js";

const router = Router();

router.get("/:id", getCart);

router.post("/:cartId/products", addProductToCart);

router.delete("/:cartId/products", deleteProductById);

router.get("/cartOrder/:userId", cartBuy);

export { router as CartRouter };
