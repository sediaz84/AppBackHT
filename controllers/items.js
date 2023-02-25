const { itemsModel } = require('../models')

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
        const { idItem, name, value, stock } = req.body

        
            const item = { idItem, name, value, stock}

            const newItem = await itemsModel.create(item)

            res.status(200).json(newItem)
        
    } catch (error) {
        res.status(400).send(error)
    }
}

const updateItems = async (req, res) => {

    try {
        const { id } = req.params
        const { name, value, quantity } = req.body

        const itemUpdate = { name, value, quantity}
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

module.exports = {
    getItems,
    createItems,
    updateItems,
    deleteItems
}