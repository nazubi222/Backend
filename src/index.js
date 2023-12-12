const express = require("express")
const dotenv = require("dotenv")
const {default: mongoose} = require("mongoose")
const routes = require("./routes")
const bodyParser = require('body-parser')
dotenv.config()
const app = express()

const port = process.env.port || 3001

app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(express.json())
app.use(bodyParser.json())
routes(app)



mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
    console.log('Connect success')
})
.catch((err) => {
    console.log(err)
})
app.listen(port, () => {
    console.log('Server is running in port:', + port)
})

