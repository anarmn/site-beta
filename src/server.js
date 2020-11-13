const path = require('path') //core node module 
const express = require('express')

const app = express()


const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))



app.listen(3001, () =>{
    console.log('Server is up on port 3001')
}) 