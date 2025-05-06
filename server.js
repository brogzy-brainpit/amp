const express= require("express");
const app= express();
const cors=require("cors");
const {connectDb}=require("./db/connectDb");
const mail=require("./routes/mail");
const products=require("./routes/products");
require("dotenv").config();


const port= process.env.PORT||5000;
app.use(express.json({limit:"20mb"})) 
app.use(cors())
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 

  app.use("/api/v1/mail",mail);
  app.use("/api/v1/products",products);
     
app.get("/",(req,res)=>{
    res.send(`<p>server up and running...</p>`)
     })
  


     app.listen(port,()=>{
        console.log(`port ${port} steady and grinding...`)
    })


const startServer=async()=>{
try {
    await connectDb(process.env.MONGODB_URI).then(()=>{
        console.log("connected successfully...");
    })
    app.listen(port,()=>{
        console.log(`port ${port} steady and grinding...`)
    })
} catch (error) {  
    console.log(`connection to mongo failed ${error}`)  
}  
}  
// startServer(); 