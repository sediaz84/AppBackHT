const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    active: {
        type: Boolean
    },
    type: {
        type: String,
        enum: ["user", "admin"],
        default: "users"
    },
    pass: {
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("users", UsersSchema)
