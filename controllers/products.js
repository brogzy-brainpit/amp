const express= require("express");
const app= express();
const {rabbitProvider}= require("../rabbitmq/provider")
const {rabbitconsumer}= require("../rabbitmq/consumer")
const amqplib = require('amqplib/callback_api');
const nodemailer= require('nodemailer')
require("dotenv").config();



 
const products=async(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
    res.setHeader('AMP-Access-Control-Allow-Source-Origin', '*');

    const{subject,mailList,ht}=req.body
   
   return res.status(200).json({items:[
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