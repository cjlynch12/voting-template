const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');




let userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  
  password: {
    type: String,
  }
});


//thanks to https://scotch.io/tutorials/easy-node-authentication-setup-and-local
//for simplified hash methods

//gen hash

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//check is password is valid
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}





module.exports = mongoose.model('User', userSchema);
