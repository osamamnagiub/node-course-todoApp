const mongoose = require("mongoose");


var User = mongoose.model("User", {
    name: String,
    age: Number
  });
  

  module.exports = {
    User
  };
  