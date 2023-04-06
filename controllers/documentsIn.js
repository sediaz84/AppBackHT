const { documentsInModel } = require('../models');
const { itemsModel } = require('../models');

const getDocumentsIn = async (req, res) => {
    //const allDocumentsIn = await documentsInModel.find({})
    try {
        const allInDocuments = await documentsInModel.aggregate([
            {
                $lookup: {
                    from: "documents",
                    localField: "document_id",
                    foreignField: "_id",
                    as: "document_id"
                }
            }
        ])
            const allInDocumentsPopulate = await documentsInModel.populate(allInDocuments, {path:"document_id"})
        res.status(200).send(allInDocumentsPopulate);
    } catch (error) {
        res.status(404).send("No hay documentos para mostrar")
    }
}

const createDocumentsIn = async (req, res) => {
    try {
        const {
            numberDocument,
            quantityItems,
            dateReception,
            itemsMissing,
            user_id,
            document_id,
            client_id
        } = req.body

        const documentIn = {
            numberDocument,
            quantityItems,
            dateReception,
            itemsMissing,
            user_id,
            document_id,
            client_id
        }

        console.log(documentIn)

        const newDocumentIn = await documentsInModel.create(documentIn)
        res.status(200).json(newDocumentIn)
    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = {
    getDocumentsIn,
    createDocumentsIn
}