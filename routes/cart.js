import { Router } from "express";
import {ContainerFS} from "../container/index.js";

const router = Router()

const cart = new ContainerFS('cart')

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

router.post('/', async (req, res)=>{
    try {
        const {timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body
        await productos.save({timestamp, nombre, descripcion, codigo, foto, precio, stock})
        const data = await cart.getAll()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})



router.delete('/:id?', async (req, res)=>{
    try {
        const {id} = req.params
        await cart.deleteById(id)
        const data = await cart.getAll()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

export {router as cartRouter}