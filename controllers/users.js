const { usersModel } = require('../models')


const getUsers = async (req, res) => {
    
    try {
        const allUsers = await usersModel.find({})
        res.send(allUsers)        
    } catch (error) {
        res.status(400).send("No hay usuarios")
    }
    
    
}

const createUsers = async (req, res) => {
    try {
        
        const { name, lastName, pass } = req.body
        
        if(!name || !lastName || !pass) return res.status(400).send("Faltan parametros")
        
        const user = { name, lastName, pass};

        const newUser = await usersModel.create(user)
        //console.log(newUser)    

        res.status(200).json(newUser)

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
            res.send(userUpdate)
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