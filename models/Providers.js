const mongoose = require('mongoose');

const ProvidersSchema = new mongoose.Schema({
    codeInt: {
        type: Number,
        unique: true
    },
    name: { 
        type: String
    },
    lastName: {
        type: String
    },
    nameCompany: {
        type: String,
        unique: true,
        allowNull: false
    },
    telephoneNumber: {
        type: Number
        
    },
    address: {
        type: String
    },
    web: {
        type: String
    },
    email:{
        type: String
    },
    contactName: {
        type: String
    },
    notes: {
        type: String
    }
}, { 
         timestamps: true

})

module.exports = mongoose.model('providers', ProvidersSchema)