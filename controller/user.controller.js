const { UserModel } = require("../models/model.user");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt")
require('dotenv').config()

exports.register=async (req,res)=>{
    try{
      const {email,password,confirmPassword}=req.body;
      if(email== undefined || password==undefined || confirmPassword==undefined ){
        return   res.status(400).send({"msg":"Fields are missing"})
    }
    if(password != confirmPassword){
        return   res.status(400).send({"msg":"Password is not Match with confirmPassword"})
    }
    const validUser=await UserModel.findOne({email})
      if(validUser){
          return   res.status(500).send({"msg":"User already present Try loggin"})
      }
      bcrypt.hash(password, 5, async function(err, hash) {
         if(err){
            return   res.status(400).send({"msg":"An error occured"})
         } 
         await UserModel.insertMany([{email,password:hash,confirmPassword}])
         return res.status(201).send({"msg":"User register successfully"})
    });
      
    }
    catch(err){
        return res.status(400).send(err.message)
    }
}


exports.login=async (req,res)=>{

    try{
        const {email,password}=req.body
        if(email==undefined || password==undefined){
            return res.status(400).send({"msg":"Fields are missing"})
        }
        const validUser=await UserModel.findOne({email})
        if(!validUser){
            return   res.status(500).send({"msg":"User not present Try register"})
        }
        bcrypt.compare(password, validUser.password, function(err, result) {
            if(err){
                return   res.status(400).send({"msg":"An error occured"})
            }
            if(result==true){
                 const token=jwt.sign({
                   id:validUser._id
                  }, "masai" );
                  localStorage.setItem("olxToken", JSON.stringify(token))
                  return   res.status(201).send({"token":token})
            }else{
                return   res.status(401).send({"msg":"Wrong credential"})
            }
        });

    }
    catch(err){
        return res.status(400).send(err.message)
    }
}

