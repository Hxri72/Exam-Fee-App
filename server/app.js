const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(bodyParser.json());

//DB connection
require("./dbconfig/dbconfig")
const userRoute = require('./routes/userRoute')

app.use('/api/user',userRoute)
// app.use(cors())



app.listen(5000,()=>{
    console.log('Server is running')
})