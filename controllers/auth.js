const {response,request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req = request, res = response) =>{
    const {correo,password} = req.body;

    try {
        //*verificar email
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:`Usuario// password no son correctos - correo`
            });
        }

        //*Si esta activo en db
        if (!usuario.estado) {
            return res.status(400).json({
                msg:`Usuario// password no son correctos - estado: False`
            });
        }
        //*verifcar password
        const validarPassword = bcryptjs.compareSync(password,usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg:`Usuario// password no son correctos - password `
            });
        }
        //TODO:generar jwt

        const token = await generarJWT(usuario.id);
            res.json({
           usuario,
           token
       });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
 
}

module.exports ={
    login
}