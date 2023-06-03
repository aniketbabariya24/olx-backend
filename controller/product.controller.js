const { ProductModel } = require("../models/model.product")

exports.addProcuct=async (req,res)=>{
    try{
        const { name,description ,category,image ,location ,postedAt ,price }=req.body;

        if(name==undefined || description==undefined || category==undefined || image==undefined ||location==undefined || postedAt==undefined || price==undefined){
           return  res.status(501).send({"msg":"Enter all details"})
        }
        await ProductModel.insertMany([{name,description ,category,image ,location ,postedAt ,price}])
        return res.status(201).send({"msg":"Product Added successfully"})
    }
    catch(err){
        return res.status(400).send(err.message)
    }

}


exports.allProduct=async( req, res )=>{
    try{
        let page= req.query.page;
       const rest=await ProductModel.find().skip(4 * page).limit(4);
       return res.status(200).send(rest)
    }
    catch(err){
        return res.status(500).send({"msg":err.message})
    }
}

exports.fliterData=async( req, res )=>{
    try{

        let page= req.query.page;
        // let category= ;
    

       const rest=await ProductModel.find({ category:req.query.category }).skip(4 * page).limit(4);
       return res.status(200).send(rest)
    }
    catch(err){
        return res.status(500).send({"msg":err.message})
    }
}
exports.sortHigh=async( req, res )=>{
    try{
        let page= req.query.page;
       const rest=await ProductModel.find().sort({price: -1}).skip(4 * page).limit(4);
       return res.status(200).send(rest)
    }
    catch(err){
        return res.status(500).send({"msg":err.message})
    }
}
exports.sortlow=async( req, res )=>{
    try{
        let page= req.query.page;
       const rest=await ProductModel.find().sort({price: 1}).skip(4 * page).limit(4);
       return res.status(200).send(rest)
    }
    catch(err){
        return res.status(500).send({"msg":err.message})
    }
}

exports.updateProduct= async (req,res)=>{
    const payload= req.body;
    const id= req.params.id;

    try {
        await ProductModel.findByIdAndUpdate({"_id":id}, payload);
        return res.status(201).send({"msg":"Product Updated successfully"})
    } catch (error) {
        res.send("Error While Updating");
        console.log(error);
    }
}

exports.deleteProduct= async (req,res)=>{
    const id= req.params.id;
    try {
        await ProductModel.findByIdAndDelete({"_id":id});
        return res.status(201).send({"msg":"Product Deleted successfully"})

    } catch (error) {
        res.send("Error While DELETING");
        console.log(error);
    }
}