import { Router } from "express";

const router = Router()

router.get('*',(req,res)=>{ 
    res.status(404).send({error: 404, message:'Sorry, esta ruta no esta implementada'})
})

export {router as eRouter}