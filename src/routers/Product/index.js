import { Router } from "express";
import { ProductController } from "../../controllers/index.js";
import { tokenValid } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", tokenValid, ProductController.getAll);

router.get("/:id", tokenValid, ProductController.getById);

router.post("/", tokenValid, ProductController.createProduct);

router.delete("/:id", tokenValid, ProductController.deleteById);

export { router as ProductRouter };
