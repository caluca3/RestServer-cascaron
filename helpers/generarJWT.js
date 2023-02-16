const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') =>{

    return new Promise((res,rej)=>{
        const payload = {uid}
        const key = process.env.SECRETORPRIVATEKEY;

        jwt.sign(payload,key,{
            expiresIn:'5h'
        },(err,token)=>{
            if (err) {
                console.log(err)
                rej('No se pudo generar el TOKEN')
            }else{
                res(token);
            }
        });
    });

}


module.exports={
    generarJWT
}