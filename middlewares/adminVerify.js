const isAdmin = true

const adminVerify = (req, res, next) => {
   if (!isAdmin) return res.send({error: 'NO TIENES PERMISO DE ADMINISTRADOR'})

   next()
}

export {adminVerify}