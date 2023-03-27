import { Router } from "express";
import passport from "passport";
import { signUp,logIn } from "../../controllers/user/index.js";


const router = Router()


router.post("/signup", signUp);


router.post('/', passport.authenticate('login', {}), logIn)


export {router as AuthRouter}