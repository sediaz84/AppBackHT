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
        type: String
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
    cuit: {
        type: String
    },
    notes: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    documentOut_id: {
        type: mongoose.Types.ObjectId,
        ref: "documents"
    },
    documentIn_id: {
        type: mongoose.Types.ObjectId,
        ref: "documents_ins"
    }
}, { 
         timestamps: true

})

ClientesSchema.statics.findAllDate = function() {
    const joinClientes = this.aggregate([
        {
            $lookup: {
                from: "documents",
                localField: "document_id",
                foreignField: "_id",
                as: "document"
            }
        },
        {
            $lookup: {
                from: "documents_ins",
                localField: "documentIn_id",
                foreignField: "_id",
                as: "documentIn"
            }
        }
    ]);
    return joinClientes;
}

ClientesSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("clientes", ClientesSchema)