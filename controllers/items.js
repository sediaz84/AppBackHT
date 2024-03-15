const { itemsModel } = require("../models");
const XLSX = require("xlsx");

const getItems = async (req, res) => {
  const countItems = await itemsModel.countWithDeleted();
  console.log(countItems);

  try {
    const allItems = await itemsModel.find({}).sort({ idItem: 1 });
    //console.log(allItems)

    res.status(200).json(allItems);
  } catch (error) {
    res.status(404).send("Sin items");
  }
};

const getItemsId = async (req, res) => {
  const { id } = req.params;
  let itemId = await itemsModel.findById({ _id: id });

  res.status(200).json(itemId);
};

const createItems = async (req, res) => {
  const countItems = await itemsModel.countWithDeleted();

  try {
    const { name, description, value, stock, stockTotal } = req.body;

    const item = { 
        idItem: countItems + 1, 
        name, 
        description, 
        value, 
        stock, 
        stockTotal };
    //console.log(item)

    const newItem = await itemsModel.create(item);

    res.status(200).json(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateItems = async (req, res) => {
  try {
    //const { id } = req.params
    const { id, value, stock, stockTotal } = req.body;
    console.log(id);
    //const itemUpdate = { value, stock, stockTotal}

    if (id || stock || value) {
      const itemPut = await itemsModel.findById({ _id: id });
      console.log(itemPut);

      itemPut.stock = itemPut.stock + parseInt(stock);
      itemPut.stockTotal = itemPut.stockTotal + parseInt(stockTotal);
      itemPut.value = value;
      itemPut.save();

      res.status(200).json(itemPut);
    } else {
      res.send("No se pudo actualizar el item");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteItems = async (req, res) => {
  try {
    const { id } = req.params;

    await itemsModel.deleteOne({ _id: id });
    res.status(200).send("Item borrado");
  } catch (error) {
    res.status(400).send(error);
  }
};

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
//    itemCreateMasive()

module.exports = {
  getItems,
  getItemsId,
  createItems,
  updateItems,
  deleteItems,
};
