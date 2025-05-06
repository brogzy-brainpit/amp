const express= require("express");
const app= express();
const {rabbitProvider}= require("../rabbitmq/provider")
const {rabbitconsumer}= require("../rabbitmq/consumer")
const amqplib = require('amqplib/callback_api');
const nodemailer= require('nodemailer')
require("dotenv").config();



 
const products=async(req,res)=>{
   // 1️⃣ Always return JSON over GET — amp-list does GET, so ignore req.body.
   res.setHeader('Content-Type', 'application/json');

   // 2️⃣ AMP-for-Email CORS v2: echo back the AMP-Email-Sender header.
   //    This single header is enough to satisfy the client.
   const sender = req.headers['amp-email-sender'];
   if (sender) {
     // Allow this sender (or '*' for any) to fetch your JSON.
     res.setHeader('AMP-Email-Allow-Sender', sender);
     // For testing you can simply do:
     // res.setHeader('AMP-Email-Allow-Sender', '*');
   }
 
   // 3️⃣ Return the same shape as amp.dev’s sample:
   //    top‑level “items” array, each with a “cart_items” list.
   
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