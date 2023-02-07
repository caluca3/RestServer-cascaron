const {response,request} = require('express');


const usuariosGet = (req = request, res = response) => {
    const {q,nombre,apikey} = req.query;
    res.json({
        msg:'GET API-controlador',
        q,
        nombre,
        apikey
        });
};

const usuariosPost  = (req = request, res=response) => {
    const {nombre,edad} = req.body;

    res.json({
        msg:'Post API-controlador!',
        nombre,edad
    });
};
const usuariosPut = (req = request, res=response) => {

    const {id} = req.params;
    res.json({
        msg:'Put API-controlador',
        id
        });
};

const usuariosDelete = (req = request, res=response) => {
    res.json({
        msg:'Delete API-controlador'
        });
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