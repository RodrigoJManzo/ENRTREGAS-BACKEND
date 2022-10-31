const {Router, Request, Response} = require(`express`);

const router = Router()

const CRUD = require("../container/container")

const productos = new CRUD('Productos')

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
        const {timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body
        await productos.save({timestamp, nombre, descripcion, codigo, foto, precio, stock})
        const data = await productos.getAll()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})


router.put('/:id?', async (req,res)=>{
    try {
        const {id} = req.params
        const {timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body
        await productos.updateById({timestamp, nombre, descripcion, codigo, foto, precio, stock }, id)
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

module.exports = router