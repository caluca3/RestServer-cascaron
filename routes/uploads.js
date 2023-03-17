const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivo } = require('../middlewares');
const { cargarArchivo, actualizarArchivo, mostrarIMG, actualizarArchivoCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/',validarArchivo,cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','Debe ser mongoID valido').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarArchivoCloudinary)


router.get('/:coleccion/:id',[
    check('id','Debe ser mongoID valido').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarIMG);
module.exports = router;