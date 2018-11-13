var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    email: {
        type: String,
        default: ''
      },
      password: {
        type: String,
        default: ''
      },
      isDeleted: {
        type: Boolean,
        default: false
      },
      signUpDate: {
        type: Date,
        default: Date.now()
      },
      googleProvider: {
        id:String,
        token:String
      },
      facebookProvider: {
        id:String,
        token:String
      }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);