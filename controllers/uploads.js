const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
// Configuration 
cloudinary.config(process.env.CLOUDINARY_URL);


const { response, request } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario,Producto } = require("../models");


const cargarArchivo = async(req = request, res = response) =>{
  
    try {
        //const nombreIMG = await subirArchivo(req.files, ['txt', 'md'],'textos');//Enviado con parametros
        const nombreIMG = await subirArchivo(req.files, undefined,'imgs');
        res.json({nombreIMG});
        
    } catch (msg) {
        res.status(400).json({msg})
    }
};

const actualizarArchivo =async(req = request, res = response)=>{
    
    const {coleccion,id} = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
           modelo = await Usuario.findById(id);
           if (!modelo) {
            return res.status(400).json({
                msg: `No existe usuario con el id ${id}`
            })
           } 
        break;

        case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
         return res.status(400).json({
             msg: `No existe usuario con el id ${id}`
         });
        }
        break;

        default:
            return res.status(500).json({msg :'Olvido algo..'})
    }

    //*Limpiar IMGS
    if (modelo.img) {
        ///Hay que borrar la img del servidor
        const pathIMG = path.join(__dirname, '../uploads',coleccion,modelo.img);
        if (fs.existsSync(pathIMG)) {
            fs.unlinkSync(pathIMG);
        }
    }

    const nombreIMG = await subirArchivo(req.files, undefined,coleccion);
    modelo.img =nombreIMG;

    modelo.save();

    res.json(modelo);
}


const mostrarIMG = async(req = request, res = response)=>{
    
    const {coleccion,id} = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
           modelo = await Usuario.findById(id);
           if (!modelo) {
            return res.status(400).json({
                msg: `No existe usuario con el id ${id}`
            });
           } 
        break;

        case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
         return res.status(400).json({
             msg: `No existe usuario con el id ${id}`
         });
        }
        break;

        default:
            return res.status(500).json({msg :'Olvido algo..'});
    }

    //
    if (modelo.img) {
        const pathIMG = path.join(__dirname, '../uploads',coleccion,modelo.img);
        if (fs.existsSync(pathIMG)) {
             return res.sendFile(pathIMG)
        }
    }
    const pathErrIMG = path.join(__dirname, '../assets','OIP.jpeg');
    res.sendFile(pathErrIMG);
}


const actualizarArchivoCloudinary =async(req = request, res = response)=>{
    
    const {coleccion,id} = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
           modelo = await Usuario.findById(id);
           if (!modelo) {
            return res.status(400).json({
                msg: `No existe usuario con el id ${id}`
            })
           } 
        break;

        case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
         return res.status(400).json({
             msg: `No existe usuario con el id ${id}`
         });
        }
        break;

        default:
            return res.status(500).json({msg :'Olvido algo..'})
    }

    //*Limpiar IMGS
    if (modelo.img) {
        //limpiar imgs
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length -1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    modelo.save();

    res.json(modelo);
}


module.exports= {
    actualizarArchivo,
    cargarArchivo,
    mostrarIMG,
    actualizarArchivoCloudinary
}