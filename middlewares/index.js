


const tieneRol  = require('../middlewares/validar-roles');
const validarCampos  = require('../middlewares/validar-campos');
const validarJWT  = require('../middlewares/validar-jwt');

module.exports={
    ...tieneRol,
    ...validarCampos,
    ...validarJWT,
}