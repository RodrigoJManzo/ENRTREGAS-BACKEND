import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local'
import { UserDao } from '../../Dao/index.js';
import { UsersMongo } from '../../Dao/users/UsersMongo.js';
import {logger} from '../../services/index.js';



const init = ( ) =>{

  passport.serializeUser((user,done)=>{
    done(null, user._id)
  })

  passport.deserializeUser(async (id,done)=>{
    try {
      const user = await UserDao.getOne({ _id: id });
      done(null,user)
    } catch (error) {
      logger.log(error)
    }
  })

  passport.use('login', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      
    }, async (req, email, password, done) =>{
      
      try {
        if(!email || !password) return done(null, false)

        const userObj = new UsersMongo()
        const user = await UserDao.getOne({email: email})
        

        const isMatch =  await userObj.matchPassword(password, user.password)

        if(isMatch) return done(null, user)

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



   