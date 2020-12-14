const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID:String,
    name:String,
    password:String,
    admin:String
});

userSchema.pre('save', function (next) {
    var user = this;
    console.log('Pre Save password ', user.password);
    if(user.password!==undefined){
        console.log('new Hash')
        bcrypt.hash(user.password, null, null, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    } else {
        next();
    }
  });

userSchema.methods.comparePassword = function(password){
   return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User',userSchema);