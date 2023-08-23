const { itemsModel } = require('../models')
const XLSX = require("xlsx")

const getItems = async (req, res) => {

    try {
        const allItems = await itemsModel.find({})
        res.status(200).json(allItems)
    } catch (error) {
        res.status(404).send("Sin items")
    }

}

const createItems = async (req, res) => {
    
    try {
        const { idItem, name, description, value, stock, stockTotal } = req.body

        
            const item = { idItem, name, description, value, stock, stockTotal}

            const newItem = await itemsModel.create(item)

            res.status(200).json(newItem)
        
    } catch (error) {
        res.status(400).send(error)
    }
}

const updateItems = async (req, res) => {

    try {
        const { id } = req.params
        const { name, description, value, quantity } = req.body

        const itemUpdate = { name, description, value, quantity}
        if( name || value || quantity ) {
            await itemsModel.findByIdAndUpdate(id, itemUpdate)
            
            res.status(200).json(itemUpdate)
        } else {
            res.send("No se pudo actualizar el item")
        }
    } catch (error) {
        res.status(400).send(error)
    }
    
}

const deleteItems = async (req, res) => {
    
    try {
        const { id } = req.params

        await itemsModel.deleteOne({_id:id})
        res.status(200).send("Item borrado")
    } catch (error) {
        res.status(400).send(error)
    }
}

// const itemCreateMasive = () => {
//     const excel = XLSX.readFile(
//         "F:\\Sistemas\\Andy\\back\\exel\\lista productos andy modificado.xlsx"              //Solo usar para cargas masivas desde un excel
//     )
//     let nombreHoja = excel.SheetNames;
//     let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]])
//     console.log(datos)

//     const newItem = datos.map(e =>{
//          itemsModel.create(e)
//     })
    
// }
//   itemCreateMasive()

module.exports = {
    getItems,
    createItems,
    updateItems,
    deleteItems
}