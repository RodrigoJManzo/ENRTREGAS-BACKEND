import express from "express";
import { renderChat, getChat, logOut } from "../../controllers/index.js";
import { tokenValid } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", renderChat );



export {router as chatRouter};