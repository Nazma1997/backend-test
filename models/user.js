const {Schema, model} = require("mongoose");

const userScheme =new Schema({
  
  name: {
    type: String,
    // required: true,
  },
  sector: {
    type: String,
    // required: true,
  },
  checkbox: {
    type: Boolean,
    // required: true,
  },
  

});

const User = model("User", userScheme)
module.exports = User;