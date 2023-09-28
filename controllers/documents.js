const { documentsModel, usersModel } = require("../models");
const { itemsModel } = require("../models");
const { clientesModel } = require("../models");
const { populate } = require("../models/Documents");

const getDocuments = async (req, res) => {
  try {
    const countDocuments = await documentsModel.countWithDeleted();
    // console.log(countDocuments)

    const countDocuments1 = await documentsModel.countDeleted();
    //console.log(countDocuments1)

    const countDocuments2 = await documentsModel.count();
    //console.log(countDocuments2)

    //const documents = await documentsModel.find({}).sort({numberDocument: -1})

    const allDocuments = await documentsModel.aggregate([
      {
        $lookup: {
          from: "clientes",
          localField: "client_id",
          foreignField: "_id",
          as: "client_id",
        },
      },
    ]);

    allDocuments.sort((a, b) => {
      if(a.numberDocument > b.numberDocument){
        return -1;
      }      
    })
        
    const allDocumentsPopulate = await documentsModel.populate(allDocuments, {
      path: "client_id",
    });

   

    res.status(200).send([allDocumentsPopulate, countDocuments]);
  } catch (error) {
    res.status(400).send("No hay documentos para mostrar");
  }
};

const getDocumentsId = async (req, res) => {
  const { id } = req.params;
  //console.log(id)
  const documents = await documentsModel.aggregate([
    {
      $lookup: {
        from: "clientes",
        localField: "client_id",
        foreignField: "_id",
        as: "client_id",
      },
    },
  ]);
  //console.log(documents)
  let documentId = await documentsModel
    .findById({ _id: id })
    .populate("client_id");
  //console.log(documentId)
  res.status(200).json(documentId);
};

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
      note,
    } = req.body;

    const document = {
      numberDocument,
      quantityItems,
      addressEvent,
      dateSend,
      dateReception,
      descriptions,
      //user_id,
      client_id,
      note,
    };
    //console.log(document)

    // const newDocumentClient = await clientesModel.findById(newDocument.client_id)
    // console.log(newDocumentClient)

    const documentCreate = await documentsModel.create(document);

    if (documentCreate.quantityItems.length > 0) {
      const stock = documentCreate.quantityItems.map(async (e) => {
        const auxStock = await itemsModel.findById(e.item);
        //console.log(auxStock.stock)
        //console.log(e.quantity)
        auxStock.stock = auxStock.stock - e.quantity;
        auxStock.save();
        //console.log(auxStock)
      });
    }

    res.status(200).json(documentCreate);
    //console.log(newDocument._id)

    //}
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateDocuments = async (req, res) => {
  try {
    let { addressEvent, dateSend, dateReception, quantityItems } = req.body;
    const { id } = req.params;
    //console.log(addressEvent, dateSend, dateReception, quantityItems)
    
    //console.log(docModify)

    let document = await documentsModel.findById(id);

    let findDocument = await documentsModel.findById(id);
    // console.log(findDocument.quantityItems)
    addressEvent ? findDocument.addressEvent = addressEvent : findDocument.address;
    dateSend ? findDocument.dateSend = dateSend : findDocument.dateReception;
    dateReception ? findDocument.dateReception = dateReception : findDocument.dateReception;
    findDocument.quantityItems = quantityItems;
    findDocument.save();
    
    //console.log(findDocument)
    //console.log(document)

          document.quantityItems.map( async (e) => {      //item D            
      let itemsNew = quantityItems.find((x) => x.item === e.item); //item m            
      // console.log(e)
      // console.log(itemsNew)
      if (itemsNew !== undefined) {
        let stockItem = await itemsModel.findById(e.item);
        if (e.quantity > itemsNew.quantity) {
          //console.log("OKKKKKKKKKKKKKKKKKKK")
          stockItem.stock = stockItem.stock + (e.quantity - itemsNew.quantity);
          stockItem.save();
          console.log(stockItem.stock)
        }

        if (e.quantity < itemsNew.quantity) {          
          //console.log("OKASSSSSS")
          stockItem.stock = stockItem.stock - (itemsNew.quantity - e.quantity);
          stockItem.save();
        }
      }

      if (!itemsNew) {
        let stockItem = await itemsModel.findById(e.item);
        //console.log("OKIISSS")
        stockItem.stock = stockItem.stock + parseInt(e.quantity);
        stockItem.save();        
      }
    });
    
    findDocument.quantityItems.map(async (e) => {
      let findItem = document.quantityItems.find(x => x.item === e.item)
      
      if(!findItem){
        console.log("Wiiiiiiii")
        const stockItem = await itemsModel.findById(e.item);
        stockItem.stock = stockItem.stock - parseInt(e.quantity);
        stockItem.save();  
      }
    })
    //console.log(findDocument.quantityItems)

    res.status(200).send(findDocument);
  } catch (error) {}
};

const armadoEntregado = async (req, res) => {
  const {id, armadoAux, entregadoAux} = req.body
  console.log(id, " ", armadoAux, " ", entregadoAux)
  
  let document = await documentsModel.findById(id)
  //console.log(document)
  
    document.armado = armadoAux
    document.entregado = entregadoAux
    document.save()

    //console.log(document)
}
 
const deleteDocuments = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      let documentDelete = await documentsModel.findById({ _id: id });      
      //console.log(documentDelete.quantityItems)
      const stockModify = documentDelete.quantityItems.map( async (e) => {
        const stockItem = await itemsModel.findById({_id:e.item})
        console.log(e.quantity)
        stockItem.stock = stockItem.stock + parseInt(e.quantity)
        stockItem.save()
        console.log(stockItem.stock)
      })
      documentDelete.delete();

      res.status(200).json({ message: "Documento eliminado" });
    } else {
      res.status(400).send("El documento no pudo ser borrado");
    }
  } catch (error) {
    console.log(error);
  }
};

// const auxArmado = async () => {
//   let documents = await documentsModel.find({numberDocument: 91})
//   console.log(documents)
//   const auxDocuments = documents.map(e => {
//     if(e.numberDocument === 91){
//     e.armado = false
//     e.entregado = false
//     e.save()
//     }
//   })
// }
//  auxArmado();

module.exports = {
  getDocuments,
  getDocumentsId,
  createDocuments,
  updateDocuments,
  armadoEntregado,
  deleteDocuments,
};
