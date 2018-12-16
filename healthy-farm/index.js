const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const path = require('path')

const app = express()


//config environment
env.config()



//connect mongo atlas
mongoose.connect(process.env.URI_LOCAL, 
                {useNewUrlParser: true});

//middleware
require('./src/config/middlewares')(app)

//config passport



//Routes
const HomeRouter = require('./src/routes/HomeRoutes')();
//const CategoryRouter = require('./src/routes/CategoryRoutes')();
//const ProductRouter = require('./src/routes/ProductRoutes')();
//const CartRouter = require('./src/routes/CartRoutes')();



app.use('/', HomeRouter);

//app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))