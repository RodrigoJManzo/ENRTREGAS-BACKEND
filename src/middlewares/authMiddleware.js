import { UserDao } from "../Dao/index.js";
import { logger } from "../services/index.js";
import { jsonWtUtils } from "../utils/jsonWtUtils.js";

/**
 *
 * @param {cookies.cookieUser and proves if the user is logged in} req
 * @param {depending on the cookies.cookieUser the answer could be succsess or an error} res
 * @param {next allows the function to be passed as an middleware and lets the course of the route to go on} next
 */
const tokenValid = async (req, res, next) => {
  try {
    const tokenGood = req.cookies.cookieUser;

    if (!tokenGood) {
      logger.log("warn", "NOT AUTHORIZED -TOKEN NOT PRESENT");
      throw new Error("NOT AUTHORIZED TOKEN NOT PRESENT");
    }

    const tokenTrue = jsonWtUtils.verifyToken(tokenGood, "secret");

    if (!tokenTrue) {
      throw new Error("NOT AUTHORIZED TOKEN NOT THE SAME");
    }

    const user = await UserDao.getById(tokenTrue.id);

    if (!user) {
      throw new Error("NOT AUTHORIZED USER NOT PRESENT");
    }
    req.user = user;

    next();
  } catch (error) {
    logger.log("warn", error.message);
    res.redirect("/");
  }
};

export { tokenValid };
