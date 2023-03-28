import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";
/**
 * @config sets the variables in wich our server can run
 * it sets:
 * -PORT
 * -Data Base for usage
 * -Nodemaile config
 */
const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    WEBSOCKET_PORT: process.env.WBPORT || 3000 ,
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
