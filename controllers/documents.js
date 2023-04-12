const { documentsModel, usersModel } = require('../models');
const { itemsModel } = require('../models');
const { clientesModel } = require('../models');

const getDocuments = async (req, res) => {

    try {
        const allDocuments = await documentsModel.aggregate([
            {
                $lookup: {
                    from: "clientes",
                    localField: "client_id",
                    foreignField: "_id",
                    as: "client_id"
                }
            }
        ])

        const allDocumentsPopulate = await documentsModel.populate(allDocuments, {path:"client_id"})

        res.status(200).send(allDocumentsPopulate)
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
            
            // const newDocumentClient = await clientesModel.findById(newDocument.client_id)
            // console.log(newDocumentClient)
            
            const documentCreate = await documentsModel.create(document)


            if(documentCreate.quantityItems.length > 0) {

                const stock = documentCreate.quantityItems.map(async (e) =>  { 
                   const auxStock = await itemsModel.findById(e.item)                   
                  // console.log(auxStock)
                   // console.log(e.quantity)
                   auxStock.stock = auxStock.stock - e.quantity
                   auxStock.save()
                   //console.log(auxStock)
                })
                
            }

           // console.log(documentCreate)
           if(documentCreate){
            const auxClient = await clientesModel.findById(documentCreate.client_id)
            console.log(auxClient)
            auxClient.documentsClients.push(documentCreate.client_id)
            auxClient.save()
           } 
           
           



           const newDocument = await documentsModel.findById(documentCreate._id)


            res.status(200).json(newDocument)
            //console.log(newDocument)
            //console.log(newDocument._id)



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