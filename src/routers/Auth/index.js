import { Router } from "express";
import passport from "passport";
import { UserDao } from "../../Dao/index.js";
import {jsonWtUtils} from '../../utils/index.js'
const router = Router()


router.post("/signup", async (req, res) => {
  try {
    const {name, lastname, email, password} = req.body
    if(!name || !lastname || !email || !password)
    return res.send({success: false})
    await UserDao.save({name, lastname,email,password})

    res.send({success:true})

  } catch (error) {
    
  }
});


router.post('/', passport.authenticate('login', {}), async (req, res)=>{
    const {user} = req

    const token = jsonWtUtils.createToken(user, 'secret')

    res.cookie('cookieUser', token, { maxAge: 60000, expires: true})

    res.send({success: true, message: "logged In", user:req.user , token})
})


export {router as AuthRouter}