const express=require("express");
const { addProcuct, allProduct, updateProduct,deleteProduct } = require("../controller/product.controller");
const productRouter=express.Router();

productRouter.post('/products/add',addProcuct)
productRouter.get('/products',allProduct)
productRouter.patch('/products/:id',updateProduct)
productRouter.delete('/products/:id',deleteProduct)

module.exports=productRouter