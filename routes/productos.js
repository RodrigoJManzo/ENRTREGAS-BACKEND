import {Router} from "express";
import {ContainerFS} from "../container/index.js"
import { adminVerify } from "../middlewares/index.js";
import { dateUtils } from "../utils/index.js";

 const router = Router()


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

router.post('/', adminVerify, async (req, res)=>{
    try {
        const {nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const productoNuevo = {
            nombre, 
            descripcion, 
            codigo, 
            foto, 
            precio, 
            stock,
            timestamp: dateUtils.getTime()
        }
        await productos.save(productoNuevo)
        const data = await productos.getAll()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})


router.put('/:id?', adminVerify, async (req,res)=>{
    try {
        const {id} = req.params
        const {nombre, descripcion, codigo, foto, precio, stock } = req.body
        await productos.updateById({
            nombre, 
            descripcion, 
            codigo, 
            foto, 
            precio, 
            stock, 
            timestamp: dateUtils.getTime() }, id)
        const data = await productos.getAll()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
    
})

router.delete('/:id?', adminVerify, async (req, res)=>{
    try {
        const {id} = req.params
        await productos.deleteById(id)
        const data = await productos.getAll()
        res.send(`El objeto con ID ${id} ha sido eliminado`, data)
    } catch (error) {
        console.log(error)
    }
})

export {router as productRouter , productos}