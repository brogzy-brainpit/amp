const express= require("express");
const app= express();
const {rabbitProvider}= require("../rabbitmq/provider")
const {rabbitconsumer}= require("../rabbitmq/consumer")
const amqplib = require('amqplib/callback_api');
const nodemailer= require('nodemailer')
require("dotenv").config();



 
const products=async(req,res)=>{
    const{subject,mailList,ht}=req.body
    res.json({message:[
        {product:"gucci",
            price:20,
            category:"females",
           },
           {product:"versace",
            price:280,
            category:"females",
           },
           {product:"balenciaga",
            price:100,
            category:"males",
           }
    ]})
       
   }
   module.exports={products}