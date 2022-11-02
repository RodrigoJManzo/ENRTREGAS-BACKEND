import { Router } from "express";
import {ContainerFS} from "../container/index.js";
import { dateUtils } from "../utils/dateUtils.js";
import { productos } from "./index.js";

const router = Router()

const cart = new ContainerFS('cart')

router.post('/', async(req, res)=>{
   try {
    const assignedCart = {timestamp: dateUtils.getTime(), productos : [] }
    const carrito = await cart.save(assignedCart)
    res.send({succses : true, carritotId : carrito.id})
   } catch (error) {
    res.send(error)
   }
})

router.delete('/:id?', async (req, res)=>{
    try {
        const {id} = req.params
        await cart.deleteById(id)
        res.send({succses: `el carrito con id ${id} fue eliminado`})
    } catch (error) {
        console.log(error)
    }
})

router.post('/:cartId/productos', async (req, res)=>{
    try {
        const {cartId} = req.params
        const { productId} = req.body

        const carrito = await cart.getById(Number(cartId))

        if(!carrito) return res.send({error: true, message: `no se encuentra el carrito`})

        const producto = await productos.getById(Number(productId))
        if(!producto) return res.send({error: true, message: `no se encuentra el producto`})

        carrito.productos.push(producto)
        
       const carritoActualizado = await cart.updateById(carrito, Number(cartId))
        
        res.send({ succses: true, carrito: carritoActualizado })

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cartId/productos/:idProd', async (req, res)=>{
    try {
        const {cartId} = req.params
        const {idProd} = req.params

        const carrito = await cart.getById(Number(cartId))

        if(!carrito) return res.send({error: true, message: `no se encuentra el carrito`})

        const producto = await productos.getById(Number(idProd))
        if(!producto) return res.send({error: true, message: `no se encuentra el producto`})

        const indexOfObject = carrito.productos.findIndex(el=> el.id=== Number(idProd))

        carrito.productos.splice(indexOfObject, 1)

        const carritoActualizado = await cart.updateById(carrito, Number(cartId))

        res.send({ succses: true, carrito: carritoActualizado })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id?', async (req,res)=>{
    try {
        const {id} = req.params
        const data = await cart.getById(id)
        res.send(data)
    } catch (error) {
        const elements = await cart.getAll()
        res.send(elements)
    }
    
})




export {router as cartRouter}