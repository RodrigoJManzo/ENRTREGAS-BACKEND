import { Router } from "express";
import passport from "passport";
import { UserDao } from "../../Dao/index.js";
import {jsonWtUtils} from '../../utils/index.js'
import { createTransport } from "nodemailer";
import { config} from "../../config/index.js"
import { logger } from "../../services/index.js";


const router = Router()


router.post("/signup", async (req, res) => {

  const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: config.NODEMAILER.Username,
        pass: config.NODEMAILER.Password,
    },
    tls: {
      rejectUnauthorized: false
  }
});


  try {

    const {name, lastname, email, password} = req.body

    const mailOptions = {
      from: 'MongoDb 3ra Entrega CoderHouse',
      to: email,
      subject: "Mail de aviso de Login",
      html:`
      
      <h1>Se Ha Logueado</h1>

      <style type="text/css">
      .tg  {border-collapse:collapse;border-color:#93a1a1;border-spacing:0;}
      .tg td{background-color:#fdf6e3;border-color:#93a1a1;border-style:solid;border-width:1px;color:#002b36;
        font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}
      .tg th{background-color:#657b83;border-color:#93a1a1;border-style:solid;border-width:1px;color:#fdf6e3;
        font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
      .tg .tg-9wq8{border-color:inherit;text-align:center;vertical-align:middle}
      </style>
      <table class="tg">
      <thead>
        <tr>
          <th class="tg-9wq8">Nombre</th>
          <th class="tg-9wq8">Apellido</th>
          <th class="tg-9wq8">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="tg-9wq8">${name}</td>
          <td class="tg-9wq8">${lastname}</td>
          <td class="tg-9wq8">${email}</td>
        </tr>
      </tbody>
      </table>`
  }
    const info = await transporter.sendMail(mailOptions)
    console.log(info)

    if(!name || !lastname || !email || !password)
    return res.send({success: false})
    await UserDao.save({name, lastname,email,password})

    res.send({success:true})

  } catch (error) {
    logger.log(error)
  }
});


router.post('/', passport.authenticate('login', {}), async (req, res, next)=>{
    const {user} = req

    const token = jsonWtUtils.createToken(user, 'secret')

    res.cookie('cookieUser', token, { maxAge: 60000, expires: true})



    res.send({success: true, message: "logged In", user:req.user , token})

    next=()=>{res.redirect('/')}
})


export {router as AuthRouter}