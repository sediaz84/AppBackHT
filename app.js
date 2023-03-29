require("dotenv").config()
const express = require("express")
const cors = require ("cors")
const dbConnect = require('./config/mongo')
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const { CORS_URL } = process.env
const port = process.env.PORT || 3001
const jsonParser = bodyParser.json()
const morgan = require("morgan")

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json({limit: '50mb'}))
app.use(cookieParser())
app.use(morgan('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', CORS_URL);
    res.header('Access-Control-Allow-Credentials', 'true');
    //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})


let urlencodedParser = bodyParser.urlencoded({ extended: false})
//Aqui se invocan las rutas

app.use("/api", require("./routes"))
app.use(express.json())
app.use(jsonParser)
app.use(urlencodedParser)

app.listen(port, () => {
    console.log( `app lista por http://localhost:${port}`)
})

dbConnect()