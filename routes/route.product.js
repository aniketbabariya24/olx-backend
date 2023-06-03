const express=require("express");
const { addProcuct, allProduct, updateProduct,deleteProduct, sortHigh, sortlow, fliterData } = require("../controller/product.controller");
const productRouter=express.Router();

productRouter.post('/add',addProcuct)
productRouter.get('',allProduct)
productRouter.get('/high',sortHigh)
productRouter.get('/low',sortlow)
productRouter.get('/filterdata',fliterData)
productRouter.patch('/update/:id',updateProduct)
productRouter.delete('/delete/:id',deleteProduct)

module.exports=productRouter