import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    SELECTED_DATABASE: process.env.SELECTED_DB ?? "mongo",
  },
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      CARTS_FILENAME,
    },
    mongo: {
      url: process.env.MONGO_DB_URL,
      dbName: process.env.MONGO_DB_NAME,
    },
  },
  NODEMAILER : {
    Name:	'Walter Aufderhar',
    Username:	'walter.aufderhar@ethereal.email',
    Password:	'qhutKFMhn5mZ3BnPSC',
  }
};

export { config };
