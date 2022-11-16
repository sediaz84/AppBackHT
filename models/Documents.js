const { text } = require('express');
const mongoose = require('mongoose');

const DocumentsSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    quantityItems:{
        type: Number
    },
    addressEvent: {
        type: String
    },
    dateSend: {
        type: Date
    },
    descriptions: {
        type: String
    },
    amountUnity: {
        type: Number
    },
    discount: {
        type: Number
    },
    preAmount: {
        type: Number
    },
    amountTotal: {
        type: Number
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('documents', DocumentsSchema)