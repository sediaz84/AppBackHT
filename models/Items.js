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
        type: Number
    },
    broken: {
        type: Boolean
    },
    active: {
        type: Boolean
    },
    quantity: {
        type: Number
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('items', ItemsSchema)