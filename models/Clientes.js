const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ClientesSchema = new mongoose.Schema({
    idClient: {
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
        allowNull: false
    },
    telephoneNumber: {
        type: Number
    },
    address: {
        type: String
    },
    city:{
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
    },
    active: {
        type: Boolean,
        default: true
    }
}, { 
         timestamps: true

})

ClientesSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("clientes", ClientesSchema)