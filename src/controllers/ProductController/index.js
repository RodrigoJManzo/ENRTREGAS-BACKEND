import { ProductDao } from "../../Dao/index.js";
import {
  DATE_UTILS,
  JOI_VALIDATOR
} from "../../utils/index.js";
import {logger} from '../../services/index.js'

/**
 * 
 * @param {requires the data from the body and with tath data sets the user} req 
 * @param {sends the product or the correct response in case of error} res 
 * 
 */

const getAll = async (req, res) => {
  try {
    const product = await ProductDao.getAll();

    if (!product) {
      logger.log('warn', error.message)
      return res.send({ error: error.message });
    }
    res.send({product});
  } catch (error) {
    res.send(error);
    }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductDao.getById(id);

  res.send(product);
};

const createProduct = async (req, res) => {
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;
    
    const existingProduct = await ProductDao.getByCode(code);

    if (existingProduct) {
      // If product exists, update the stock
      const id = existingProduct._id
      const newStock = existingProduct.stock +1
      const product  = await ProductDao.updateStock(id, newStock);
      logger.log('info', `${existingProduct.title} stock updated`)
      res.send('202', `stock updated`)

      } else {
      // If product doesn't exist, create a new product
      const product = await JOI_VALIDATOR.product.validateAsync({
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
        timestamp: DATE_UTILS.getTimestamp(),
      }
      )
      const newProduct = await ProductDao.save(product);
      res.send(newProduct);
    }

  } catch (error) {
    logger.error('error', error.message)
    res.send(error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    
    await ProductDao.deleteById(id);

    res.send({ success: true });
    logger.log('info', 'OBJECT DELETED')

  } catch (error) {
    logger.error(error.message);
    res.send({ error: "Ocurrio un error" });
  }
};

export const ProductController = {
  getAll,
  getById,
  createProduct,
  deleteById,
};
