const { documentsModel, usersModel } = require('../models');
const { itemsModel } = require('../models');
const { clientesModel } = require('../models');
const { populate } = require('../models/Documents');

const getDocuments = async (req, res) => {

    try {

        const countDocuments = await documentsModel.countWithDeleted()
       // console.log(countDocuments)

        const countDocuments1 = await documentsModel.countDeleted()
        //console.log(countDocuments1)

        const countDocuments2 = await documentsModel.count()
        //console.log(countDocuments2)

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

const getDocumentsId = async (req, res) => {    
    const { id } = req.params
    console.log(id)
    const documents = await documentsModel.aggregate([
        {
            $lookup: {
                from: "clientes",
                localField: "client_id",
                foreignField: "_id",
                as: "client_id"
            }
        }
    ])
    //console.log(documents)
    let documentId = await documentsModel.findById({_id: id}).populate("client_id");
    //console.log(documentId)
    res.status(200).json(documentId)
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
            //console.log(document)
            
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
            //console.log(auxClient)
            auxClient.documentsClients.push(documentCreate._id) 
            auxClient.save()
           } 

           const newDocument = await documentsModel.findById(documentCreate._id)
           //console.log(newDocument)

           res.status(200).json(newDocument)
            //console.log(newDocument._id)



            //} 

    } catch (error) {
        res.status(400).send(error)
    }
    
}

const updateDocuments = async (req, res) => {
    
    try {
        const { addressEvent, dateSend, dateReception, quantityItems } = req.body
        const { id } = req.params
        console.log(addressEvent, dateSend, dateReception, quantityItems)
        
        const findDocument = await documentsModel.findById({_id: id})
        //console.log(findDocument)

        addressEvent ? findDocument.addressEvent = addressEvent : findDocument.address;
        dateSend ? findDocument.dateSend = dateSend : findDocument.dateReception; 
        dateReception ? findDocument.dateReception = dateReception : findDocument.dateReception;
        findDocument.quantityItems = quantityItems;
        findDocument.save();

        res.status(200).send(findDocument)

        
    } catch (error) {
        
    }    
}

const deleteDocuments = async (req, res) => {
    try {
        const { id } = req.params

        if(id){
            const documentDelete = await documentsModel.findById({_id: id})
            documentDelete.delete()
           // console.log(documentDelete)
            res.status(200).json({message:"Documento eliminado"})
        } else {
            res.status(400).send("El documento no pudo ser borrado")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getDocuments,
    getDocumentsId,
    createDocuments,
    updateDocuments,
    deleteDocuments
}