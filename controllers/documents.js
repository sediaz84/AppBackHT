const { documentsModel } = require('../models');
const { itemsModel } = require('../models');

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
            numberDocument, 
            quantityItems, 
            addressEvent, 
            dateSend,
            dateReception, 
            descriptions,
            //user_id,
            client_id,
            //items_id 
        } = req.body
            
            
        const document = { 
            numberDocument, 
            quantityItems, 
            addressEvent, 
            dateSend, 
            dateReception,
            descriptions,
            //user_id,
            client_id,
            //items_id
        }     
            //console.log(document.quantityItems.length)
            if(document.quantityItems.length > 0) {
                const stock = document.quantityItems.map(async (e) =>  { 
                   const auxStock = await itemsModel.findById(e.item)                   
                   //console.log(auxStock.stock)
                    //console.log(e.quantity)
                   auxStock.stock = (auxStock.stock - e.quantity)
                   auxStock.save()
                   console.log(auxStock)
                })
                
            }

            const newDocument = await documentsModel.create(document)

                //console.log(newDocument)
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