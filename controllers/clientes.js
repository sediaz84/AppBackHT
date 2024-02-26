const { clientesModel } = require("../models");
const XLSX = require("xlsx")


// const getClientes = async (req, res) => {
//   try {
//    // const user = req.user  // esta información viene del middleware de session, no informa que usuario es el que consume
//     //console.log(req.user)
    
//     const { _id } = req.body;
//     const allClients = await clientesModel.find({});

//     if(_id){
//         let searchClient = clientesModel.findById({_id: _id});
//         res.status(200).json(searchClient);
//     } else if(allClients.length > 0) {
//       res.status(200).json(allClients); //{allClients, user}
//     } else {
//       res.status(400).send("No hay clientes");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const getClientes = async (req, res) => {
    try {
     // const user = req.user  // esta información viene del middleware de session, no informa que usuario es el que consume
      //console.log(req.user)
      
      const allClients = await clientesModel.find({}).sort({idClient:1});
    //   const allClientsAndDeleted = await clientesModel.countWithDeleted({});
      
    //   console.log(allClientsAndDeleted)      
      
  
      if(allClients.length > 0) {
        res.status(200).json(allClients); //{allClients, user}
      } else {
        res.status(400).send("No hay clientes");
      }
    } catch (error) {
      console.log(error);
    }
  };

const getClientesId = async (req, res) => {
    const { id } = req.params
    let clienteId = await clientesModel.findById({_id: id});

    res.status(200).json(clienteId);

    
}  

const createCliente = async (req, res) => {

    try {

        const { 
            idClient,
            name,
            lastName,
            nameCompany,
            telephoneNumber,
            address,
            city,
            email,
            contactName,
            notes,
            cuit,
            active
            } = req.body

        const client = {
            idClient,
            name,
            lastName,
            nameCompany,
            telephoneNumber,
            address,
            city,
            email,
            contactName,
            notes,
            cuit,
            active            
        }
        console.log(client);

        // if( !name || !lastName || !nameCompany ) {
        //      return res.status(400).send("Faltan parámetros")
        // } else {
        // }
        const newClient = await clientesModel.create(client)
        res.status(200).json(newClient)

    } catch (error) {
        res.status(400).send(error)
    }
};

const updateCliente = async (req, res) => {

    try {
        const { id } = req.params
        const {
            name,
            lastName,
            nameCompany,
            telephoneNumber,
            address,
            city,
            email,
            contactName,
            notes
        } = req.body

        const updateClient = {
            name,
            lastName,
            nameCompany,
            telephoneNumber,
            address,
            city,
            email,
            contactName,
            notes
        }
        console.log(id);
        console.log(updateClient);

        if (updateClient) {
            await clientesModel.findByIdAndUpdate(id, updateClient)

            res.status(200).json(updateClient)
        } else {
            res.status(400).send("No se pudo actualizar el cliente")
        }
    } catch (error) {
        console.log(error)
    }
};

const deleteCliente = async (req, res) => {

    try {
        const { id } = req.params

        if(id){
        const clienteDelete = await clientesModel.findById({_id: id})
        clienteDelete.delete()
        console.log(clienteDelete)
        res.status(200).send("Cliente borrado")
        } else { 
            res.status(400).send("El cliente no pude ser borrado")
        }
    } catch (error) {
        console.log(error)
    }
};

// const clientCreateMasive = () => {
//     const excel = XLSX.readFile(
//         "F:\\Sistemas\\Andy\\back\\exel\\clientes andy modificado.xlsx"              Solo usar para cargas masivas desde un excel
//     )
//     let nombreHoja = excel.SheetNames;
//     let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]])
//     console.log(datos)

//     const newClient = datos.map(e =>{
//          clientesModel.create(e)
//     })
    
// }
//  clientCreateMasive()

const nameCompanyClient = async () => {
    const aux = await clientesModel.find({});
    //console.log(aux);
    const aux1 = aux.map(e=> { 
       if(e.nameCompany === undefined){
        e = {...e, nameCompany:""}
       }
    })
}

//nameCompanyClient()

module.exports = {
  getClientes,
  getClientesId,
  createCliente,
  updateCliente,
  deleteCliente,
};
