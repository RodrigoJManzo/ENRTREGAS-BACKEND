import express from "express";
import {create} from "express-handlebars";
import { productRouter } from "../routes/index.js";
import { cartRouter } from "../routes/index.js";


const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: false}))

const PORT = process.env.PORT || 8080

const hbs = create({
    extname: `.hbs`,
});
app.engine(`.hbs`, hbs.engine)
app.use(express.static('public'))

app.use(`/api/productos`, productRouter)
app.use(`/api/carrito`, cartRouter)

app.set(`view engine`, `.hbs`)
app.set(`views`, `../views`)




app.listen(PORT, ()=>{
    console.log(`Servidor iniciado correctamente en Puerto ${PORT}`)
})