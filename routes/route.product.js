const express=require("express");
const { addProcuct, allProduct, updateProduct,deleteProduct } = require("../controller/product.controller");
const productRouter=express.Router();

productRouter.post('/add',addProcuct)
productRouter.get('',allProduct)
productRouter.patch('/update/:id',updateProduct)
productRouter.delete('/delete/:id',deleteProduct)

module.exports=productRouter