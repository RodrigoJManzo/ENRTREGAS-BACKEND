import express from "express";
import {engine} from "express-handlebars"
import { config } from "./config/index.js";
import { ProductRouter, CartRouter, AuthRouter } from "./routers/index.js";
import cors from "cors";
import session from "express-session"
import {PassportAuth} from './middlewares/index.js'
import passport from "passport";
import cookieParser from 'cookie-parser'



const app = express();
PassportAuth.init()
app.use(session(
 { 
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  }
))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({ origin: "http://localhost:3000" }));
app.engine('.handlebars', engine({defaultLayout: 'main'}));
app.use(express.static("../public"));
app.set("views", `../public/views`);
app.set('view engine', '.handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",AuthRouter)
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.get("/", (req,res)=>{
  res.render("products-table")
})

const server = app.listen(config.SERVER.PORT, () =>
  console.log(`Server running on port ${server.address().port}`)
);
