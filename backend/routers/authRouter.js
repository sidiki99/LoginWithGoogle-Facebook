const { googleLogin } = require("../controllers/authController");

const router =require("express").Router();

router.get("/text",(req,res)=>{
  res.send("GT text")
})
router.get("/google",googleLogin)
module.exports=router