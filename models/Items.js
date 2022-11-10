const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
    codInt: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    value: {
        type: Integer
    },
    broken: {
        type: Boolean
    },
    active: {
        type: Boolean
    },
    quantity: {
        type: Integer
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('items', ItemsSchema)