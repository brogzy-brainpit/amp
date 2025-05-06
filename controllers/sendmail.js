const express= require("express");
const app= express();
const {rabbitProvider}= require("../rabbitmq/provider")
const {rabbitconsumer}= require("../rabbitmq/consumer")
const amqplib = require('amqplib/callback_api');
const nodemailer= require('nodemailer')
require("dotenv").config();



const amqp={
    queue:"mailin",
    // amqp:"amqp://localhost",
    amqp:process.env.AMQP_URL  // global
  }

 
const mail=async(req,res)=>{
    const{subject,mailList,ht}=req.body
    const list= mailList.split(",")
try {
    let config= {
        host:"smtp.gmail.com",
        port: 465,
        secure: true, // use SSL  
         auth:{ 
                user:'dangabarin2020@gmail.com',
                pass:"yabccxpsciuoynqs"
            },      
      } 
    const mail_config={
        from :'memet omar <dangabarin2020@gmail.com>',
        to:mailList,
        replyTo:"dangabarin2020@gmail.com",
        subject: subject,
        text: 'hello world!',
        html:ht,  
        list: {
            // List-Help: <mailto:admin@example.com?subject=help>
            help: 'memetOumar@gmail.com?subject=help',
            // List-Unsubscribe: <http://example.com> (Comment)
            unsubscribe: {
                url: 'http://google.com/search',
                comment: 'Click here to unsubscribe'
            },
            // List-Subscribe: <mailto:admin@example.com?subject=subscribe>
            // List-Subscribe: <http://example.com> (Subscribe)
            // subscribe: [
            //     'admin@example.com?subject=subscribe',
            //     {
            //         url: 'http://example.com',
            //         comment: 'Subscribe'
            //     }
            // ],
           
          
        } 
      }
      let transport =nodemailer.createTransport(config)
     // Send the message using the previously set up Nodemailer transport
     transport.sendMail(mail_config, (err, info) => {
      if (err) {
          console.error(err.stack);
          // put the failed message item back to queue
           channel.nack(data);
      }
     
      console.log('Delivered message %s', info);
      res.status(200).json({msg:"email sent successfully!"})
  }) 
    
} catch (error) {
    res.status(500).json({msg:"something went wrong!"})

    
}
   

    
       let configx= {
        host:"smtp-mail.outlook.com",
            port:587,
           
            auth:{
                user:'dangabarin2023@outlook.com',
                pass:"Mimihaha2020!"
                
            }, 
             
             
      } 
//    await  rabbitProvider(amqp,res,{...req.body,list})
        // rabbitconsumer(amqp,res,config,list.length)
       

     
    //    rabbitProvider(config,res).then(()=>{
    //     rabbitconsumer(config,res)
    //    })
     
   
       
   }
   module.exports={mail}