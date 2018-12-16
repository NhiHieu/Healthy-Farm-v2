const express = require('express')
const Category = require('../models/Category')
const Product = require('../models/Product')
const ProductRoutes = express.Router();

function router(){
    ProductRoutes.route('/:cate')
        .get((req ,res) =>{
            const cate = req.params.cate;
            (async function mongo(){
                try{
                    const CateId = await Category.find({Name: cate});
                    const listProduct = await Product.find({CategoryId : CateId});
                    
                    //ejs file here
                    res.render('category', listProduct)
                }catch(err){
                    console.log(err)
                }

            }())
        })
    return ProductRoutes
}

module.exports = router;
