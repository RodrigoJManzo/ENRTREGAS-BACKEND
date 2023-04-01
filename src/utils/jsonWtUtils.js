import jwt from "jsonwebtoken";

const createToken = (data, secretKey) => jwt.sign(data, secretKey);

const verifyToken = (token, secretKey) => jwt.verify(token, secretKey);

export const jsonWtUtils = {
  createToken,
  verifyToken,
};
