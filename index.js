import express from "express";
import {engine} from "express-handlebars"
import { config } from "./src/config/index.js";
import { ProductRouter, CartRouter, AuthRouter, docRouter,chatRouter} from "./src/routers/index.js";
import session from "express-session"
import {PassportAuth} from './src/middlewares/index.js'
import passport from "passport";
import cookieParser from 'cookie-parser'
import _dirname from "./src/dirname.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import cors from "cors"


const swaggerOptions ={
  definition:{
    openapi: "3.0.0",
    info:{
      title: "ENTREGA FINAL CODERHOUSE CURSO BACKEND",
      description:"Aplicacion en Express, Modelo Vista Controlador, documentada en Swagger, con un interfas en GraphQL y persistencia en MongoDB"
    },
  },
  apis: ["./src/docs/**/*.yaml"],
}


const app = express();

const swaggerSpecs = swaggerJSDoc(swaggerOptions)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.use(cookieParser())
PassportAuth.init()
app.use(session(
 { 
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  }
))
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.engine('.handlebars', engine({defaultLayout: 'main'}));
app.use(express.static('./public/'));
app.set("views", './src/views/');
app.set('view engine', '.handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",AuthRouter)
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/", AuthRouter)
app.use("/chat", chatRouter)
app.use('/api/docs', docRouter)

import {WebSocketServer} from "ws"
import  {createServer} from "http";
const websocketServer = createServer(app)
const wss = new WebSocketServer({ noServer:true, websocketServer})

wss.on('connection', function conection (ws){
  ws.on('message', function incoming(data){
    wss.clients.forEach(function each(client){
      if(client != ws  && client.readyState == WebSocket.OPEN){
        client.send(data)
      }
    })
  })
})

const server = app.listen(config.SERVER.PORT, () =>
   console.log(`Server running on port ${server.address().port} /// Info avaliable on /api/docs`)
 );
