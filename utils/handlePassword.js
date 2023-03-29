const bcryptjs = require('bcryptjs');


// passwordPlain es la contraseña(string) sin encriptar que recibe la funcion por parametro
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)

    // se retorna la contraseña hasheada
    return hash 
}

//Pasa contraseña sin encriptar(passwordPlain) y contraseña encriptada(hashPassword)

const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)

}



module.exports = { encrypt, compare }