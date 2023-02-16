const { response,request } = require("express");



const validarRol = (res = response,req=request, next) =>{

    if (!req.usuario) {
        return res.status(500).json({
            msg:'No esta validado el token'
        })
    }
    const {rol,nombre} = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:`${nombre} no es administrador - No esta autorizado`
        });
    };

    next();
};
//El operador rest en fn lo convierte en un arreglo
const tieneRol = (...roles ) =>{
    return (req,res= response,next ) =>{
        if (!req.usuario) {
            return res.status(500).json({
                msg:'No esta validado el token'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg:`Debe ser alguno de estos roles ${roles}`
            });
        }

        next();
    }
}

module.exports={
    validarRol,
    tieneRol
}