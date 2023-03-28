import joi from "joi";

const product = joi.object({
  title: joi.string().min(3).max(45).required(),
  description: joi.string().min(3).max(100).required(),
  code: joi.string().min(3).max(6).required(),
  thumbnail: joi.string().min(3).max(150).required(),
  price: joi.number().required(),
  stock: joi.number().required(),
  timestamp: joi.string().required(),
});


const user = joi.object({
    name: joi.string().min(3).max(100).required(),
    lastname: joi.string().min(3).max(100).required(),
    email: joi.string().min(3).max(89).required(),
    age:joi.number().required(),
    number:joi.number().required(),
    password: joi.string().min(3).max(150).required(),
})

export const JOI_VALIDATOR = { product, user };
