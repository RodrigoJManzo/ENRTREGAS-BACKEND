const express = require(`express`)
const {create} = require (`express-handlebars`)

const app = express();

const cartRoutes = require(`../routes/cart`)
const productRoutes = require(`../routes/productos`)

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const PORT = process.env.PORT || 8080

const hbs = create({
    extname: `.hbs`,
});
app.engine(`.hbs`, hbs.engine)
app.use(express.static('public'))

app.use(`/productos`, productRoutes)
app.use(`/carrito`, cartRoutes)

app.set(`view engine`, `.hbs`)
app.set(`views`, `../views`)




app.listen(PORT, ()=>{
    console.log(`Servidor iniciado correctamente en Puerto ${PORT}`)
})