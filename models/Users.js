const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    type: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    pass: {
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("users", UsersSchema)
