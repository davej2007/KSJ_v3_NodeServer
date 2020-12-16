const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamID:String,
    pin:String,
    event: [{type: mongoose.Schema.Types.ObjectId, ref:'Event'}]
});

teamSchema.pre('save', function (next) {
    var team = this;
    console.log('Pre Save Pin ', team.pin);
    if(team.pin!==undefined){
        console.log('new Hash')
        bcrypt.hash(team.pin, null, null, function(err, hash) {
            if(err) return next(err);
            team.pin = hash;
            next();
        });
    } else {
        next();
    }
  });

teamSchema.methods.comparePin = function(pin){
   return bcrypt.compareSync(pin, this.pin);
}

module.exports = mongoose.model('Team',teamSchema);