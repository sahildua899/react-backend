const express = require('express');
const cors = require('cors')
const app = express();
const api = require('./src/routes/api');
const helmet = require('helmet')
require('dotenv').config();
app.use(cors())
app.use(helmet())
require('./src/db/conn')
app.use(express.json())



app.get('/*', (req,res)=>{
    res.render('index')
})
app.use('/api', api)


module.exports = app