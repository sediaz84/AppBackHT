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