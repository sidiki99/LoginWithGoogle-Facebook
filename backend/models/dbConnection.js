const mongoose = require ("mongoose");
const DB_URL = process.env.MONGODB_URI;
mongoose.connect(DB_URL)
.then(()=>{
  console.log("Mongo DB is Connected");
   }
)
.catch((err)=>{
  console.log("Coonection Failed to MONGO DB due to : ",err)
  

})

