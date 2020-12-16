const express = require('express');
const router  = express.Router();
const TEAM = require('../models/team')

// Check Team ID Not In Use
router.post('/checkTeamId', (req,res)=>{
    if (req.body.teamID == null || req.body.teamID == '') {
        res.json({success:false, message: 'No Team ID Entered'});
    } else {
        TEAM.findOne({teamID:req.body.teamID}).select('_id').exec((err,team)=>{
            if(err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                if(!team){
                    res.json({success:true, message:'Team ID Not Found', team :{_id:'notInUse'}});
                } else {
                    res.json({success:true, message:'Team ID Found', team:team})
                }
            }
        })
    }
});


// Create New Event
router.post('/createNewEvent', (req,res)=>{
    if (req.body.teamID == null || req.body.teamID == '') {
        res.json({success:false, message: 'No Event ID Entered' });
    } else if (req.body.hostName == null || req.body.hostName == '') {
        res.json({success:false, message: 'No Host Name Entered' });
    } else if (req.body.venue == null || req.body.venue == '') {
        res.json({success:false, message: 'No Venue Entered' });
    } else {
        var team = new TEAM({
            teamID:req.body.teamID,
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
        team.save((err)=>{
            if (err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                res.json({ success:true, team: team });
            }
        });
    }
});

module.exports = router;