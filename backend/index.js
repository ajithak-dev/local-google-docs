const express = require('express');
const route = require('./routes/notes.route.js')
const fs= require('fs')
const cors = require('cors');


const path = require('path')

const PORT = 8000;

const app = express()
app.use(cors());


//CRUD Fuctionalities
app.use('/note', route)



app.listen(PORT, ()=>{
    console.log(`server is listening to ${PORT}`)
})