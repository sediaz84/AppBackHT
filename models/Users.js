const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
 
const UsersSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    type: {
        type: ["user", "admin"],         
        default: "user"
    },
    userId: {
        type: String
    },
    pass: {
        type: String
    } 
},
{
    timestamps: true
})

module.exports = mongoose.model("users", UsersSchema)
