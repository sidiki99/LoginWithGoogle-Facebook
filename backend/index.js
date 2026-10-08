const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"])
const express = require("express")
const app = express()
require("dotenv").config();
require("./models/dbConnection")
const port = process.env.port || 8001;
const authRouter = require("./routers/authRouter")
const cors = require("cors")
const cookieParser = require ("cookie-parser");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/",(req,res)=>{
  res.send("Hello From NOde JS")
})

app.use("/",authRouter)

app.listen(port,()=>{
  console.log (`Server is running at port : ${port}`)
})

