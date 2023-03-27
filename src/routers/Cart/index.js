import { Router } from "express";
import {addProductToCart,getCart, deleteProductById} from '../../controllers/index.js'



const router = Router();

router.get("/:id", getCart);


router.post("/:cartId/products", addProductToCart);

router.delete("/:cartId/products", deleteProductById);

export { router as CartRouter };
