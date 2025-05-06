const express= require("express");
const app= express();
const {rabbitProvider}= require("../rabbitmq/provider")
const {rabbitconsumer}= require("../rabbitmq/consumer")
const amqplib = require('amqplib/callback_api');
const nodemailer= require('nodemailer')
require("dotenv").config();



 
const products=async(req,res)=>{
    const{subject,mailList,ht}=req.body
   
    res.json({items:[
        {
          "fullname": "John Doe",
          "phonenumber": "212-555-1212",
          "cart_items": [
            {
              "name": "Pluot",
              "quantity": 5,
              "price": "$1.00"
            },
            {
              "name": "Apple",
              "quantity": 1,
              "price": "$3.25"
            }
          ],
          "address": {
            "addr1": "111 8th Ave",
            "city": "New York",
            "state": "NY",
            "zipcode": 10011
          }
        }
      ]})
       
   }
   module.exports={products}