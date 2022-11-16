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
            date, 
            quantityItems, 
            addressEvent, 
            dateSend, 
            descriptions,
            amountUnity,
            discount,
            preAmount,
            amountTotal } = req.body

        const document = { 
            date, 
            quantityItems, 
            addressEvent, 
            dateSend, 
            descriptions,
            amountUnity,
            discount,
            preAmount,
            amountTotal
        }     
        
        if(
            !date 
            || !quantityItems
            || !addressEvent
            || !dateSend
            || !descriptions
            || !amountUnity
            || !discount
            || !preAmount
            || !amountTotal
            ) {
                const newDocument = await documentsModel.create(document)

                res.status(200).json(newDocument)
            } 

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