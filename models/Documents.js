const { text } = require('express');
const mongoose = require('mongoose');

const DocumentsSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    quantityItems:{
        type: Integer
    },
    addressEvent: {
        type: String
    },
    dateSend: {
        type: Date
    },
    descriptions: {
        type: Text
    },
    amountUnity: {
        type: Integer
    },
    discount: {
        type: Integer
    },
    preAmount: {
        type: Integer
    },
    amountTotal: {
        type: Integer
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('documents', DocumentsSchema)