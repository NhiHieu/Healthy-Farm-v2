const express = require('express')
const app = express()
const port = 3000
const env = require('dotenv')
const mongoose = require('mongoose')
env.config()
console.log("My comment")


//connect mongo atlas
mongoose.connect(process.env.uri, {useNewUrlParser: true});


app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))