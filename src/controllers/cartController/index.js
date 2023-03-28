import { CartDao, ProductDao } from "../../Dao/index.js";
import { logger } from "./../../services/index.js";
import {DATE_UTILS} from "../../utils/date-utils.js"


/**
   * @addProductToCart adds a product givven the cart Id in params and the ProductId from Body
   * @getCart gets all the carts listed on the DB
   * @createCart creates a cart, this method is used inside the SignUp function, and adds a cart to a user.
   * @deleteProductById deletes a product given the CartId in params and the Product ID forom Body
*/

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
  if (!cart){
    return res.send({ error: true, message: error.message });
  }

  const product = await ProductDao.getById(productId);


  if (!product){
    logger.log('warn', 'product was not found')
    return res.send(`There is no product`);
  }
    

  let existingProduct = cart.products.find(p => p.id === product.id)

  if (existingProduct){
    existingProduct.quantity += 1;
  }else{
    const newProduct = {...product, quantity : 1}
    cart.products.push(newProduct)
  }

  const updatedCart = await CartDao.updateById(cartId, cart);

  res.send({ success: true, cart: updatedCart });

  logger.log('info', 'PRODUCT ADDED')
};

const deleteProductById = async (req , res) =>{
  const {cartId} = req.params
  const {productId} = req.body

  try {
    const cart = await CartDao.getById(cartId);
    if (!cart) {
      return { error: true, message: "Cart not found" };
    }

    const updatedProducts = cart.products.filter(
      (product) => product.id !== productId
    );

    const updatedCart = await CartDao.updateById(cartId, {
      ...cart,
      products: updatedProducts,
    });
    res.send(`product deleted`)
    return updatedCart;
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { 
    addProductToCart,
    getCart,
    createCart,
    deleteProductById,
    
 };
