const express = require('express')
const app = express()
const colors = require('colors')
require('dotenv').config()
const userRoutes = require('./router/user.routes.js')
const adminRoutes = require('./router/admin.routes.js')
const studentRoutes = require('./router/student.routes.js')
const connectDB = require('./db/index.js')
const path = require('path')
var cors = require('cors')

app.use(cors({credentials:true  , origin: 'http://localhost:5173'}))
app.use('/public', express.static(__dirname + '/public'));
const PORT = process.env.PORT || 5000
connectDB()
app.use(express.json())
app.use('/',userRoutes)
app.use('/admin',adminRoutes)
app.use('/student',studentRoutes)

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${5000}`.cyan.bgGreen);
})


