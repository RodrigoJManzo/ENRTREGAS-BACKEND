import express from "express";
import { engine } from "express-handlebars";
import { config } from "./src/config/index.js";
import {
  ProductRouter,
  CartRouter,
  AuthRouter,
  docRouter,
  chatRouter,
} from "./src/routers/index.js";
import session from "express-session";
import { PassportAuth } from "./src/middlewares/index.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import _dirname from "./src/dirname.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ENTREGA FINAL CODERHOUSE CURSO BACKEND",
      description:
        "Aplicacion en Express, Modelo Vista Controlador, documentada en Swagger, con un interfas en GraphQL y persistencia en MongoDB",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};

const app = express();

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(cookieParser());
PassportAuth.init();
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.engine(".handlebars", engine({ defaultLayout: "main" }));
app.use(express.static("./public"));
app.set("views", "./src/views/");
app.set("view engine", ".handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/", AuthRouter);
app.use("/chat", chatRouter);
app.use("/api/docs", docRouter);

import { Server as HttpServer } from "http";
import { Server as IoServer } from "socket.io";
import { ChatMongo } from "./src/Dao/chat/chatMongo.js";
import dayjs from "dayjs";

const chatMongo = new ChatMongo();

const httpServer = new HttpServer(app);

const server = httpServer.listen(config.SERVER.PORT, () =>
  console.log(
    `Server running on port ${
      server.address().port
    } /// Info avaliable on /api/docs`
  )
);

server.on("error", (error) => console.log(`Server Error ${error}`));

const io = new IoServer(httpServer);

io.on(`connection`, (socket) => {
  sendMensajes(socket);
  console.log(`Cliente nuevo conectado`);
  socket.on(`mensajeNuevo`, (mensajeNuevo) => {
    messageSaver(mensajeNuevo);
  });
});

const sendMensajes = async (socket) => {
  const allMsg = await chatMongo.getAll();
  socket.emit(`todosMensajes`, allMsg);
};

//Obtengo y Guardo mensajes
const messageSaver = async (mensaje) => {
  const date = new Date();
  const fechaFormato = dayjs(date).format(`DD/MM/YYYY hh:mm:ss`);
  const mongoMesagge = {
    sender: mensaje.sender,
    message: mensaje.message,
    createdAt: fechaFormato,
  };
  await chatMongo.save(mongoMesagge);
  const messages = await chatMongo.getAll();
  io.sockets.emit(`todosMensajes`, messages);
};
