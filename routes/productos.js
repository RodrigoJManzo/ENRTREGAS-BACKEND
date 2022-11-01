import {Router} from "express";
import {ContainerFS} from "../container/index.js"
import { dateUtils } from "../utils/dateUtils.js";

 const router = Router()

// const CRUD = require("../container/container")

const productos = new ContainerFS('Productos')

router.get('/:id?', async (req,res)=>{
    try {
        const {id} = req.params
        const data = await productos.getById(id)
        res.send(data)
    } catch (error) {
        const elements = await productos.getAll()
        res.send(elements)
    }
    
})

router.post('/', async (req, res)=>{
    try {
        const {nombre, descripcion, codigo, foto, precio, stock } = req.body
        const productoNuevo = {
            nombre, 
            descripcion, 
            codigo, 
            foto, 
            precio, 
            stock,
            timestamp: dateUtils.getTime()}
        await productos.save(productoNuevo)
        const data = await productos.getAll()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})


router.put('/:id?', async (req,res)=>{
    try {
        const {id} = req.params
        const {nombre, descripcion, codigo, foto, precio, stock } = req.body
        await productos.updateById({nombre, descripcion, codigo, foto, precio, stock, timestamp: dateUtils.getTime() }, id)
        const data = await productos.getAll()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
    
})

router.delete('/', async (req, res)=>{
    try {
        const {id} = req.params
        await productos.deleteById(id)
        const data = await productos.getAll()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

export {router as productRouter}