import express from "express";
import  {renderChat}  from "../../controllers/index.js";
import { tokenValid } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", tokenValid,  renderChat );



export {router as chatRouter};