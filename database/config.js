const mongoose  = require("mongoose")


const dbConnection = async()=>{
    try {
    mongoose.set('strictQuery',false);
    mongoose.connect(process.env.MONGODB_CNN,()=>{
    console.log('Base de datos Online');
    });

        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion');
    }
}


module.exports = dbConnection;