import { CartDao, ProductDao, UserDao } from "../../Dao/index.js";
import { logger } from "./../../services/index.js";
import { DATE_UTILS } from "../../utils/date-utils.js";
import { createTransport } from "nodemailer";
import { config } from "../../config/index.js";

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

  logger.log("info", "CART CREATED");
  return { cartId: cart.id };
};

const addProductToCart = async (req, res) => {
  const { productId } = req.body;
  const { cartId } = req.params;

  const cart = await CartDao.getById(cartId);
  if (!cart) {
    return res.send({ error: true, message: error.message });
  }

  const product = await ProductDao.getById(productId);

  if (!product) {
    logger.log("warn", "product was not found");
    return res.send(`There is no product`);
  }

  let existingProduct = cart.products.find((p) => p.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    const newProduct = { ...product, quantity: 1 };
    cart.products.push(newProduct);
  }

  const updatedCart = await CartDao.updateById(cartId, cart);

  res.send({ success: true, cart: updatedCart });

  logger.log("info", "PRODUCT ADDED");
};

const deleteProductById = async (req, res) => {
  const { cartId } = req.params;
  const { productId } = req.body;

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
    res.send(`product deleted`);
    return updatedCart;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const cartBuy = async (req, res) => {
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: config.NODEMAILER.Username,
      pass: config.NODEMAILER.Password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const { userId } = req.params;

  const user = await UserDao.getById(userId);

  const email = user.email;

  const name = user.name;

  const cart = user.cart;

  const cartId = cart.cartId;

  const cartObj = await CartDao.getById(cartId);
  console.log(` this are the objects in cart  ${cartObj}`);

  const products = cartObj.products;

  let totalPrice = products.reduce((acumulator, product) => {
    return acumulator + product.price;
  }, 0);
  logger.log(`info`, `the total price of your cart is ${totalPrice}`);
  res.send(
    `the total Price on you cart is $ ${totalPrice} enjoy your products`
  );

  const mailOptions = {
    from: "MongoDb Entrega Final de Coderhouse Backend",
    to: email,
    subject: "ORDEN DE COMPRA",
    html: `
      
      <h1>GRACIAS POR TU COMPRA ${name}</h1>

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
          <th class="tg-9wq8">Title</th>
          <th class="tg-9wq8">description</th>
          <th class="tg-9wq8">Thumbnail</th>
          <th class="tg-9wq8">Price</th>
          <th class="tg-9wq8">Code</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(
          (product) => `
        <tr>
          <td class="tg-9wq8">${product.title}</td>
          <td class="tg-9wq8">${product.description}</td>
          <td class="tg-9wq8">${product.thumbail}</td>
          <td class="tg-9wq8">${product.price}</td>
          <td class="tg-9wq8">${product.code}</td>
        </tr>
      `
        )}
      </tbody>
    </table>
    The Total Price of you Order is $ ${totalPrice}`,
  };
  const info = await transporter.sendMail(mailOptions);
  logger.log(`info`, info);
};

export { addProductToCart, getCart, createCart, deleteProductById, cartBuy };
