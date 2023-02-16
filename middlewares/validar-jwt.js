const {response,request} = require('express');
const jwt= require('jsonwebtoken');

const Usuario = require('../models/usuario');



const req = request;
const res = response;


const key = process.env.SECRETORPRIVATEKEY;

const validarJWT = async (req = request,res = response, next)=>{
    const token = req.header('x-token')
    
    if (!token) {
       return res.status(401).json({msg:"Error en token"});
    }
    try {
        const{uid} = jwt.verify(token,key);

        const usuario = await Usuario.findById(uid);
        //Validar que exista el usuario
        if (!usuario) {
            return res.status(401).json({
                msg:'Usuario no existe en DB'
            });
        }
        //validar que el estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg:'Usuario con estado - false'
            });
        }
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
       res.status(401).json({msg: "Token no valido"});
    }
}


module.exports={
    validarJWT
}
