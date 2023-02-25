const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const DocumentsSchema = new mongoose.Schema({
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    numberDocument: {
        type: Number
    },
    quantityItems:{
        type: Number
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
    },
    // pending: {
    //     type: Array,
    //     default: []
    // },  
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"client"
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
                from: "clients",
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