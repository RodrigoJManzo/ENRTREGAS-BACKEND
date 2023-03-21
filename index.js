import express from "express";
import {engine} from "express-handlebars"
import { config } from "./src/config/index.js";
import { ProductRouter, CartRouter, AuthRouter} from "./src/routers/index.js";
import session from "express-session"
import {PassportAuth} from './src/middlewares/index.js'
import passport from "passport";
import cookieParser from 'cookie-parser'
import _dirname from "./src/dirname.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'

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

// app.get("/", (req,res)=>{
//   res.render("home")
// })
// app.get("/login", (req, res)=>{
//   res.render('login')
// })

// app.get("/signup", (req, res)=>{
//   res.render('signup')
// })

const server = app.listen(config.SERVER.PORT, () =>
  console.log(`Server running on port ${server.address().port} /// Info avaliable on /api/docs`)
);
