import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local'
import { UserDao } from '../../Dao/index.js';
import {logger} from '../../services/index.js';



const init = ( ) =>{

  passport.serializeUser((user,done)=>{
    done(null, user.id)
  })

  passport.deserializeUser(async (id,done)=>{
    const user = await UserDao.getById(id)
    done (null, user);
  })

  passport.use('login', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      
    }, async (req, email, password, done) =>{
      
      try {
        if(!email || !password) return done(null, false)

        const user = await UserDao.getOne({email: email})

        const match =  await user.matchPassword(password)

        if(match) return done(null, user)

        const userResponse = {
          id: user._id,
          email: user.email,
          cart: user.cart
        }

        done (null, userResponse)

      } catch (error) {
        logger.log(error);
        done(error)
      }
    }
  ))
}






export const PassportAuth = {init}



   