const mongoose = require ("mongoose");
const UserSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
   email:{
    type:String,
    required:true,
    unique:true
  },
   facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },
  image:{
    type:String
  }
})

 const UserModel = mongoose.model("social_logins",UserSchema)
module.exports= UserModel