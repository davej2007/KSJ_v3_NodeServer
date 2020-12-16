const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventID:String,
    title:String,
    hostName:String,
    venue:String,
    startTime:{ date: String, time: String, value: Number },
    finishTime:{ date: String, time: String, value: Number },
    duration:String,    
    type:String,
    messageScreens: Boolean,
    songBook: Boolean,
    // songRequest : [{type: mongoose.Schema.Types.ObjectId, ref:'Request'}]
});

module.exports = mongoose.model('Event',eventSchema);