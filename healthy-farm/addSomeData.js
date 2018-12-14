const mongoose = require('mongoose')
const env = require('dotenv')
const Role = require('./models/Role')

env.config()
console.log(process.env.URI);
mongoose.connect(process.env.URI, {useNewUrlParser: true});

docs = [
    {Key: 'admin'},
    {Key: 'seller'},
    {Key: 'user'}
]

Role.create(docs, (err, cb) =>{
    if(err)
        return handleError(err)
    //saved
    console.log("Saved data:" + docs)
})
