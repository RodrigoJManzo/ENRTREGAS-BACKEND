const {Router, Request, Response} = require(`express`);

const router = Router()

const CRUD = require("../container/container")

const cart = new CRUD('cart')

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

module.exports = router