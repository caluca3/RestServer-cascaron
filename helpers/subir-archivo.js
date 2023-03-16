const path = require('path');
const {v4:uuid4} = require('uuid');


const subirArchivo = (files,extensionesValidas = [ 'jpg', 'png' , 'jpeg', 'gif'],carpeta = '') =>{

    return new Promise((resolve,reject)=>{
        const  {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar extension
        if (!extensionesValidas.includes(extension)) {
            reject(`La extension ${extension} no es permitida - ${extensionesValidas}`)
        }
 
        const nombreTemp = uuid4() +'.'+extension;
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
          if (err) {
            reject(err);
          }
      
          resolve( nombreTemp);
        });
    });
}

module.exports = {
    subirArchivo
}