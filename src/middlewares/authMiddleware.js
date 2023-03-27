import { UserDao } from "../Dao/index.js"
import { logger } from "../services/index.js"
import { jsonWtUtils } from "../utils/jsonWtUtils.js"

const tokenValid = async (req, res, next) =>{
    try {
        
        const tokenGood = req.cookies.cookieUser


        if(!tokenGood){
            throw new Error ('NOT AUTHORIZED TOKEN NOT PRESENT')
        }

        const tokenTrue = jsonWtUtils.verifyToken(tokenGood, 'secret')

        if(!tokenTrue){
            throw new Error ('NOT AUTHORIZED TOKEN NOT THE SAME')
        }

        const user = await UserDao.getById(tokenTrue.id)
        
        if(!user){
            throw new Error ('NOT AUTHORIZED USER NOT PRESENT')
        }
        req.user = user
        
        next()

    } catch (error) {
        logger.log('warn',error.message)
        res.status(401).send("NOT AUTHORIZED")
        }

        
}


export {tokenValid}