import { UserDao } from "../../Dao/index.js";
import {createCart} from '../cartController/index.js'
import {JOI_VALIDATOR, jsonWtUtils} from '../../utils/index.js'
import { createTransport } from "nodemailer";
import { config} from "../../config/index.js"
import { logger } from "../../services/index.js";

const signUp =  async (req, res) => {

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

    const {name, lastname, age, number, email, password} = req.body

    try {
      const validated = await JOI_VALIDATOR.user.validateAsync({
        name,
        lastname,
        age,
        number,
        email,
        password
      })  
      if (validated){
        logger.log(`info`, `User data Validated`)
      }    
    } catch (error) {
      res.status(422, error.message)
    }

    try {
       const exist = await UserDao.getOne({email:email})
       if(exist){
        logger.log('USER ALREADY IN DATABASE', exist)
        return('user already exist', res.send(`user already exists - User is = ${exist.email} and cart = ${exist.cart}`))
       }
    } catch (error) {
      console.log(error)      
    } if (name || lastname || email){}

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
          <th class="tg-9wq8">Edad</th>
          <th class="tg-9wq8">CellNumber</th>
          <th class="tg-9wq8">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="tg-9wq8">${name}</td>
          <td class="tg-9wq8">${lastname}</td>
          <td class="tg-9wq8">${age}</td>
          <td class="tg-9wq8">${number}</td>
          <td class="tg-9wq8">${email}</td>
        </tr>
      </tbody>
      </table>`
  }
    const info = await transporter.sendMail(mailOptions)
    logger.info(info)

    if(!name || !lastname || !age || !number|| !email || !password)
    return res.send({success: false})
    const cart = await createCart()
    const user = {name, lastname, age, number,email,password, cart}
    await UserDao.save(user)

    res.send({success:true})

  } catch (error) {
    logger.error('error', error.info)
  }
};


const logIn = async (req, res, next)=>{
    const {user} = req

    const token = jsonWtUtils.createToken(user, 'secret')

    res.cookie('cookieUser', token, { maxAge: 60000, expires: true})

    logger.log('info','USER LOGGED IN')

    res.send({success: true, message: "logged In", user:req.user , token})

    next=()=>{
      if(res.status === 200){res.redirect('/')
    }else(error)=>{
      logger.error(error)
    }
  }
}


export {signUp, logIn}