const { validationResult } = require("express-validator");

/**
 * 
 * @param {*} req  
 * @param {*} res 
 * @param {*} next Continua si todo es ok 
 * @returns 
 */
const validarCampos = (req,res,next)=>{
     //Manejo de errores con validator
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json(errors);
     }
     next();
}

module.exports = {
    validarCampos
}