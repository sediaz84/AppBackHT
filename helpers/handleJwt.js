const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET



//Primero creamos un metodo para generar o firmar el token
//Se debe pasar el objeto del usuario(name, lastName, etc)

const tokenSign = async (user) => {
    const sign = jwt.sign( 
        {                           //Se pasa el payload, la informacion que se quiere devolver del usuario "NUNCA ENVIAR EL PASSWORD"
            _id: user._id,
            userId: user.userId,
            type: user.type
        },
        JWT_SECRET, //Se pasa como segundo argumento la variable de entorno
        {
            expiresIn: "2h", //Este tercer argumento es opcional, en este caso es la expiración del token. Luego de la expiración el usuario deberá loguearse nuevamente
        }
    );
    return sign; //retorna el JTW o token

}

//Segundo creamos la verificacion del token, que haya sido firmado por backend
//Como parámetro se pasa el token de sesión o JWT
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET) //Verifica la firma
        
    } catch (error) {
        return error;
    }

}

module.exports = { tokenSign, verifyToken}