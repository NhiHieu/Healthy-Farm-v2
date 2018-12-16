const express = require('express')
const Product = require('../models/Product')

const HomeRoutes = express.Router();

function router(){
    HomeRoutes.route('/')
        .get((req ,res) =>{
            (async function mongo(){
                const listProduct = await Product.find();
                
                res.render('home', {title:'fucking world'});
            }())
        })
    return HomeRoutes
}

module.exports = router;

