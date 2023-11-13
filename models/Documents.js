const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const DocumentsSchema = new mongoose.Schema({
    numberDocument: {
        type: Number
    },
    date: {
        type: String
    },
    quantityItems:{
        type: Array,
        default: []
    },
    addressEvent: {
        type: String
    },
    dateSend: {
        type: Date
    },
    dateReception: {
        type: Date
    },
    descriptions: {
        type: String
    },
    state: {
        type: Boolean,
        default: false
    },
    approved: {
        type: Boolean,
        default: false
    },
    armado: {
        type: Boolean,
        default: false
    },
    entregado: {
        type: Boolean,
        default: false
    },
    parcial: {
        type: Boolean,
        default: false
    },    
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"users"
    // },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"clientes"
    },
    notes: {
        type: String,        
    },
    notesDelete: {
        type: String
    }       
},
{
    timestamps: true
});

DocumentsSchema.statics.findAllData = function () {
    const joinDocument = this.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: "clientes",
                localField: "client_id",
                foreignField: "_id",
                as: "client"
            }

        },
        {
            $lookup: {
                from: "items",
                localField: "items_id",
                foreignField: "name",
                as: "item"
            },
        },
    ]);
    return joinDocument;
}

DocumentsSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model('documents', DocumentsSchema)