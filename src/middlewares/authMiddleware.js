import { UserDao } from "../Dao/index.js"
import { jsonWtUtils } from "../utils/jsonWtUtils.js"

const tokenValid = async (req, res, next) =>{
    try {
        const {tokenGood} = req.cookies

        if(!tokenValid){
            throw new Error ('NOT AUTHORIZED')
        }

        const tokenTrue = jsonWtUtils.verifyToken(tokenGood, 'secret')

        if(!tokenTrue){
            throw new Error ('NOT AUTHORIZED')
        }

        const user = await UserDao.getById(tokenTrue.id)

        if(!user){
            throw new Error ('NOT AUTHORIZED')
        }

        req.user = user

        next()

    } catch (error) {
        console.log(error)
        res.status(401).send("NOT AUTHORIZED")
        }
}


export {tokenValid}