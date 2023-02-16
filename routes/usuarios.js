const { Router} = require('express');
const { check } = require('express-validator');


const  { validarJWT,validarRol,tieneRol,validarCampos } = require('../middlewares');

const { esRoleValido, existeEmail, existeUsuarioId } = require('../helpers/db-validator');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete,
        usuariosPatch,} = require('../controllers/usuarios.controlador');



const router = Router();

router.get('/', usuariosGet);

router.post('/',[
    check('nombre','El nombre no es valido ').not().isEmpty(),
    check('password','Debe tener minimo 6 caracteres').isLength({min:6}),
    check('correo').custom(existeEmail),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPost)

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut);

router.delete('/:id',[
    validarJWT,
    //validarRol,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
],usuariosDelete);

router.patch('/',usuariosPatch);


module.exports = router;
