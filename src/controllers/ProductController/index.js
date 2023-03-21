import { ProductDao } from "../../Dao/index.js";
import {
  DATE_UTILS,
  ERRORS_UTILS,
  JOI_VALIDATOR,
  LOGGER_UTILS,
} from "../../utils/index.js";
import {logger} from '../../services/index.js'


const getAll = async (req, res) => {
  try {
    const product = await ProductDao.getAll();

    if (!product) {
      return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
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

    const product = await JOI_VALIDATOR.product.validateAsync({
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      timestamp: DATE_UTILS.getTimestamp(),
    });

    const createdProduct = await ProductDao.save(product);

    res.send(createdProduct);
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    logger.error(error)
    res.send(error);
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
