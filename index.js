import express from "express";
import {engine} from "express-handlebars"
import { config } from "./src/config/index.js";
import { ProductRouter, CartRouter, AuthRouter} from "./src/routers/index.js";
import session from "express-session"
import {PassportAuth} from './src/middlewares/index.js'
import passport from "passport";
import cookieParser from 'cookie-parser'
import _dirname from "./src/dirname.js";



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
app.engine('.handlebars', engine({defaultLayout: 'main'}));
app.use(express.static('./public/'));
app.set("views", './src/views/');
app.set('view engine', '.handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",AuthRouter)
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.get("/", (req,res)=>{
  res.render("home")
})
app.get("/login", (req, res)=>{
  res.render('login')
})

app.get("/signup", (req, res)=>{
  res.render('signup')
})

const server = app.listen(config.SERVER.PORT, () =>
  console.log(`Server running on port ${server.address().port}`)
);
