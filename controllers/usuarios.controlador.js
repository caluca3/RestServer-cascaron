const {response,request} = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0} = req.query;
    const query = {estado:true};
    const [total,usuarios] = await Promise.all([
         Usuario.countDocuments(query),
         Usuario.find(query)
                .skip(Number(desde))
                .limit(Number( limite))
    ])

    res.json({
        total,
        usuarios
    });
};
 

const usuariosPost  = async(req = request, res=response) => {

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    
    //Se guarda en DB
    await usuario.save();

    res.json({
        msg:'Post API-controlador!',
        usuario
    });
};


const usuariosPut = async (req = request, res=response) => {

    const {id} = req.params;
    const {_id,password,google,correo,...resto } = req.body
    //VAlidar contra la DB
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);
};


const usuariosDelete = async(req = request, res=response) => {
    
    const {id} = req.params;

    //Para no perder el integridad referencial u acciones del usuario
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});


    res.json(usuario);
};

const usuariosPatch  = (req = request, res=response) => {
    res.json({
        msg:'Patch API-controlador'
        });
};

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
}