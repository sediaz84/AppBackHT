const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const DocumentsInSchema = new mongoose.Schema({
    numberDocument: {
        type: Number
    },
    quntityItems:{
        type: Array,
        default: []
    },
    dateReception: {
        type: String
    },
    itemsMissing: {
        type: Array,
        default: []
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref:"users"
    },
    document_id: {
        type: mongoose.Types.ObjectId,
        ref:"documents"
    },
},
{
    timestamps: true
});

DocumentsInSchema.statics.findAllDate = function() {
    const joinDocumentIn = this.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreingField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: "documents",
                localField: "document_id",
                foreingField: "_id",
                as: "document"
            },
        },
    ]);
    return joinDocumentIn;
}

DocumentsInSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model('documentsIn', DocumentsInSchema)