import { Router } from "express";
import {addProductToCart,getCart} from '../../controllers/index.js'



const router = Router();

router.get("/:id", getCart);


router.post("/:cartId/products", addProductToCart);

export { router as CartRouter };
