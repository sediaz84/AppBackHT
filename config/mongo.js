const mongoose = require('mongoose');
const {DB_URI} = process.env

const dbConnect = () => {
    mongoose.connect(
        DB_URI,
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, res) => {
        if(!err){
            console.log("*** Conexión Correcta ***")
        } else {
            console.log("*** Error de Conexión ***")
        }
    });
};

module.exports = dbConnect;