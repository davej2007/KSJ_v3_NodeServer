const express = require('express');
const router  = express.Router();
const EVENT = require('../models/event')

// Check Event ID Not In Use
router.post('/checkEventId', (req,res)=>{
    if (req.body.eventID == null || req.body.eventID == '') {
        res.json({success:false, message: 'No Event ID Entered' });
    } else {
        EVENT.findOne({eventID:req.body.eventID}).select('_id date title startTime').exec((err,event)=>{
            if(err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                if(!event){
                    res.json({success:false, message:'Event ID Not Found'});
                } else {
                    res.json({success:true, message:'Event ID Found', event:event})
                }
            }
        })
    }
});

// Create New Event
router.post('/createNewEvent', (req,res)=>{
    if (req.body.eventID == null || req.body.eventID == '') {
        res.json({success:false, message: 'No Event ID Entered' });
    } else if (req.body.hostName == null || req.body.hostName == '') {
        res.json({success:false, message: 'No Host Name Entered' });
    } else if (req.body.venue == null || req.body.venue == '') {
        res.json({success:false, message: 'No Venue Entered' });
    } else {
        var event = new EVENT({
            eventID:req.body.eventID,
            hostName:req.body.hostName,
            title:req.body.title,
            startTime:req.body.startTime, 
            finishTime:req.body.finishTime,
            duration:req.body.duration,
            venue:req.body.venue,
            type:req.body.type,
            messageScreens: req.body.messageScreens,
            songBook:req.body.songBook
        });
        event.save((err)=>{
            if (err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                res.json({ success:true, event: event });
            }
        });
    }
});

module.exports = router;