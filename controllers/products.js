const express= require("express");
const app= express();
const {rabbitProvider}= require("../rabbitmq/provider")
const {rabbitconsumer}= require("../rabbitmq/consumer")
const amqplib = require('amqplib/callback_api');
const nodemailer= require('nodemailer')
require("dotenv").config();



 
const products=async(req,res)=>{
    // 1️⃣ Only allow GET (amp-list does GET)
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

  // 2️⃣ CORS v1 (AMP Playground / validator)
  const origin = req.headers.origin;
  const ampSourceOrigin = req.query.__amp_source_origin;
  if (origin && ampSourceOrigin) {
    // Mirror the Origin that the AMP runtime sent
    res.setHeader('Access-Control-Allow-Origin', origin);
    // Expose the AMP access-control header
    res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
    // Tell AMP which source‑origin is allowed
    res.setHeader('AMP-Access-Control-Allow-Source-Origin', ampSourceOrigin);
  }

  // 3️⃣ CORS v2 (in‑email clients)
  const sender = req.headers['amp-email-sender'];
  if (sender) {
    // Echo back the same sender (or use '*' for testing)
    res.setHeader('AMP-Email-Allow-Sender', sender);
  }

  // 4️⃣ Always return JSON
  res.setHeader('Content-Type', 'application/json');

  // 5️⃣ Your payload, matching your <amp-list> default of items→cart_items
   
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