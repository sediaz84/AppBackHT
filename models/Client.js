const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    codeInt: {
        type: Integer,
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
        type: Integer
    },
    address: {
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

module.exports = mongoose.model("client", ClientSchema)