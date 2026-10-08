const { googleLogin 
  ,facebookCallback,
  facebookLogin,
  getMe,
  logout
} = require("../controllers/authController");
const protect= require("../middleware/authMiddleware")

const router =require("express").Router();

router.get("/text",(req,res)=>{
  res.send("GT text")
})

router.get("/google",googleLogin)
router.get("/facebook", facebookLogin);
router.get("/facebook/callback", facebookCallback);
router.get("/me",protect,getMe);

router.get("/logout", logout);

module.exports=router