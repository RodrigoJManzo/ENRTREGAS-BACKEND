import { Router } from "express";
import passport from "passport";
import { signUp,logIn } from "../../controllers/user/index.js";


const router = Router()

router.get("/", (req, res)=>{
    try {
        const user = req.user.email
        res.render('home', {user: user})
        console.log(user)
    } catch (error) {
        res.render('home')
    }
})

router.get("/login", (req, res)=>{
    res.render('login')
})

router.get("/signup" , (req,res) => {
    res.render('signup')
})


router.post("/signup", signUp);


router.post('/', passport.authenticate('login', {}), logIn)


export {router as AuthRouter}