const { documentsModel } = require('../models');

const getDocuments = async (req, res) => {

    try {
        const allDocuments = await documentsModel.find({})
        res.send(allDocuments)
    } catch (error) {
        res.status(400).send("No hay documentos para mostrar")
    }

}

const createDocuments = async (req, res) => {

    try {
        const { 
            //date,
            numberDocument, 
            quantityItems, 
            addressEvent, 
            dateSend,
            dateReception, 
            descriptions,
            amountUnity,
            discount,
            preAmount,
            amountTotal,
            user_id,
            client_id,
            items_id } = req.body

        const document = { 
            //date,
            numberDocument, 
            quantityItems, 
            addressEvent, 
            dateSend, 
            dateReception,
            descriptions,
            amountUnity,
            discount,
            preAmount,
            amountTotal,
            user_id,
            client_id,
            items_id
        }     
        
                const newDocument = await documentsModel.create(document)
                console.log(newDocument)
                res.status(200).json(newDocument)
            //} 

    } catch (error) {
        res.status(400).send(error)
    }
    
}
const updateDocuments = async (req, res) => {
    
}
const deleteDocuments = async (req, res) => {
    
}

module.exports = {
    getDocuments,
    createDocuments,
    updateDocuments,
    deleteDocuments
}