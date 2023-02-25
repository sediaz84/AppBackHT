const { clientesModel } = require("../models");


const getClientes = async (req, res) => {
  try {
    const user = req.user  // esta información viene del middleware de session, no informa que usuario es el que consume
    //console.log(req.user)
    const allClients = await clientesModel.find({});
    if (allClients.length > 0) {
      res.status(200).json({allClients, user});
    } else {
      res.status(400).send("No hay clientes");
    }
  } catch (error) {
    console.log(error);
  }
};

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
            active } = req.body

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
            active
        } = req.body

        const updateClient = {
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
            active
        }

        if (updateClient.length > 0) {
            await clientesModel.update.findByIdAndUpdate(id, updateClient)

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
        await clientesModel.deleteOne({_id: id})
        res.status(200).send("Cliente borrado")
        } else { 
            res.status(400).send("El cliente no pude ser borrado")
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
};
