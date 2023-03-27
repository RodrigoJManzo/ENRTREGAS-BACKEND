import { CartDao, ProductDao } from "../../Dao/index.js";
import { logger } from "./../../services/index.js";
import {DATE_UTILS} from "../../utils/date-utils.js"

const getCart = async (req, res) => {
  const { id } = req.params;
   const cart = await CartDao.getById(id);

  res.send({ success: true, cart });
};

const createCart = async (req, res) => {
  const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

  const cart = await CartDao.save(baseCart);

  logger.log('info', 'CART CREATED')
  return({cartId: cart.id });
  
};



const addProductToCart = async (req, res) => {
  const { productId } = req.body;
  const { cartId } = req.params;

  const cart = await CartDao.getById(cartId);

  if (!cart)
    return res.send({ error: true, message: error.message });

  const product = await ProductDao.getById(productId);

  if (!product)
    return res.send({ error: true, message: error.message });
    logger.log('warn', error.message)


  cart.products.push(product);

  const updatedCart = await CartDao.updateById(cartId, cart);

  res.send({ success: true, cart: updatedCart });
  logger.log('info', 'PRODUCT ADDED')
};

export { 
    addProductToCart,
    getCart,
    createCart
 };
