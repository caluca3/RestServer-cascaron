const express = require('express');
const cors = require('cors');

const dbConnection = require('../database/config');

class Server{
    
    constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = '/api/usuarios';
    this.authPath = '/api/auth';

    //Conexion a la base de datos
    this.conexionDB();
    
    //Middawlare para servir contenido
    this.middleware();

    //Rutas de la aplicacion
    this.routes();
    }

    async conexionDB(){
        await dbConnection();
    }

    middleware(){
       
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.userPath,require('../routes/usuarios'));

    }

    listen(){
    
        this.app.listen(this.port,()=>{
        console.log(`Servidor en ${this.port}`);
        });
    }
}

module.exports = Server;