const { verifyToken } = require("../helpers/handleJWT");
const { usersModel } = require("../models")


const authMiddleware = async (req, res, next) => {
    try {

        if(!req.headers.authorization){
            return res.status(403).send("Not Token")   
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token)
        //console.log(dataToken._id)

        if(!dataToken._id) return res.status(403).send("Error token")

        const user = await usersModel.findById(dataToken._id) // se busca al usuario que hace la petición y/o está consumiendo 
        //console.log(user)
        req.user = user                                // obtenemos el usuario que consume la petición
        //console.log(req.user)

        next()
        
    } catch (error) {
        res.status(400).send("No tiene permisos")
    }
} 


module.exports = authMiddleware