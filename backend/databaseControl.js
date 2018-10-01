const mongoose = require('mongoose');
const config = require("lib/config");


mongoose.connect(
  "mongodb+srv://hongshan:" + config.MONGO_ATLAS_PW + "@cluster0-p2c40.mongodb.net/test",
  { useNewUrlParser : true}
).then(()=> {
  console.log("Connected to the database")
}).catch(()=>{
  console.log("Connection failed")
});

const createNewSchema = () => {

}
