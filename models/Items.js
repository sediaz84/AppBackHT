const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ItemsSchema = new mongoose.Schema({
    
    idItem: {
        type: Number,
        unique: true
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
    stock: {
        type: Number
    },
    stockTotal: {
        type: Number
    }    
},
{
    timestamps: true
})

ItemsSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model('items', ItemsSchema)