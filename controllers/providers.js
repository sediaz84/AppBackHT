const { providersModel } = require('../models')

const getProviders = async ( req, res ) => {

    try {
        const allProviders = await providersModel.find({})
        res.status(200).json(allProviders)
    } catch (error) {
        res.status(400).send("Noy hay proveedores")
    }

}

const createProviders = async ( req, res ) => {

    try {
        const {
            codeInt, 
            name, 
            lastName, 
            nameCompany, 
            telephoneNumber, 
            address, 
            web, 
            email, 
            contactName, 
            notes
         } = req.body

         const provider = {
            codeInt, 
            name, 
            lastName, 
            nameCompany, 
            telephoneNumber, 
            address, 
            web, 
            email, 
            contactName, 
            notes
         }

         if ( !name || !lastName || !nameCompany) {
            res.status(400).send("Nombre, Apellido y Nombre de Compañia son obligatorios")
         } else {
            const newProvider = await providersModel.create(provider)

            res.status(200).json(newProvider)
         }
    } catch (error) {
        res.status(400).send(error)
    }
    
}

const updateProviders = async ( req, res ) => {
    
    try {
        const { id } = req.params
        const {
            codeInt, 
            name, 
            lastName, 
            nameCompany, 
            telephoneNumber, 
            address, 
            web, 
            email, 
            contactName, 
            notes
        } = req.body

        const providerUpdate = {
            codeInt, 
            name, 
            lastName, 
            nameCompany, 
            telephoneNumber, 
            address, 
            web, 
            email, 
            contactName, 
            notes
        }

        await providersModel.findByIdAndUpdate(id, providerUpdate)

        res.status(200).json(providerUpdate)
    } catch (error) {
        res.status(400).send(error)
    }    
}

const deleteProviders = async ( req, res ) => {
    
}


module.exports = {
    getProviders,
    createProviders,
    updateProviders,
    deleteProviders
}


// codeInt, name, lastName, nameCompany, telephoneNumber, address, web, email, contactName, notes