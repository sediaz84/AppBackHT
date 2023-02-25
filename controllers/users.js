const { usersModel } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { encrypt, compare } = require( '../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt');


const getUsers = async (req, res) => {
    
    try {
        const allUsers = await usersModel.find({})
        res.status(200).json(allUsers)        
    } catch (error) {
        res.status(400).send("No hay usuarios")
    }
    
    
}

const login = async (req, res) => {

    // const user = await usersModel.findOne({userId: req.body.userId})  Tutorial bluebip
    // if(!user) return res.status(400).json({error: "No hay usuario"})

    // const validPassword = await bcrypt.compare(req.body.pass, user.pass);
    // if(!validPassword) return res.status(400).json({error: "Contraseña incorrecta"})

    // res.json({message: "bienvenido"})

    try {
        const { userId, pass } = req.body 

        //console.log(userId, pass)

        const user = await usersModel.findOne({userId:userId}).select('userId pass type')
        //console.log(user)

        if(!user) return res.status(404).json({error: "No hay usuario"})
        
        const hashPassword = user.pass;
        const check = await compare(pass, hashPassword)
        if(!check) return res.status(401).json({error: "Error de clave"}) //401 usuario autorizado

        
        user.set('pass', undefined, {strict:false}) //Esta línea sirve para no mostrar al password en el token
        const data = {                  //Si todo sale bien, devolvemos un token de sesión y la data del usuario
            token: await tokenSign(user),
            user
        }

        res.send({data})

    } catch (error) {
        res.status(400).send(error)
    }

}

const createUsers = async (req, res) => {
    

    // try {        Tutorial bluebip
        
    //     const salt = await bcrypt.genSalt(10);
    //     const password = await bcrypt.hash(req.body.pass, salt)
        
    //     const { name, lastName, pass, userId } = req.body
        
                
    //     if(!name || !lastName || !pass) return res.status(400).send("Faltan parametros")
        


    //     const user = { name, lastName, pass:password, userId};

    //     const newUser = await usersModel.create(user)
    //     //console.log(newUser)    

    //     res.status(200).json(newUser)

    // } catch (error) {
    //     res.status(400).send(error)
        
    // }

    try { //tutorial leifer mendez
        const { name, lastName, pass, userId } = req.body

        const password = await encrypt(req.body.pass)

        const user = { name, lastName, pass: password, userId }

        const userData = await usersModel.create(user)

        const data = {
            token: await tokenSign(userData),
            user: userData
        }
        res.status(200).json(data)
        
    } catch (error) {
        res.status(400).send(error)
        
    }
}


const updateUsers = async (req, res) => {
    
    try {
        const { id } = req.params
        const { name, lastName, pass } = req.body
        
        let userUpdate = { name, lastName, pass}

        if(userUpdate) {
            await usersModel.findByIdAndUpdate(id, userUpdate)
            //console.log(userUpdate)
            res.status(200).json(userUpdate)
        } else { res.status(400).send("se necesita un parametro para actualizar")
    }
    } catch (error) {
        res.status(400).send('No se pudo actualizar')
    }    
}

const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params
        
        await usersModel.deleteOne({_id:id})
        res.send("Usuario borrado")
    } catch (error) {
        res.status(400).send("El usuario no pudo ser borrado")        
    }
}

module.exports = {
    getUsers,
    login,
    createUsers,
    updateUsers,
    deleteUsers
}

// name: {
//     type: String
// },
// lastName: {
//     type: String
// },
// active: {
//     type: Boolean
// },
// type: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user"
// },
// pass: {
//     type: String
// }