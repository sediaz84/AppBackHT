const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const DocumentsSchema = new mongoose.Schema({
    numberDocument: {
        type: Number
    },
    quantityItems:{
        type: Array,
        default: []
    },
    addressEvent: {
        type: String
    },
    dateSend: {
        type: String
    },
    dateReception: {
        type: String
    },
    descriptions: {
        type: String
    },
    state: {
        type: Boolean,
        default: false
    },     
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"clientes"
    },
    items_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"items"
    }],   
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