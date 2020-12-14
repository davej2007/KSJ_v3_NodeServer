const express = require('express');
const router  = express.Router();
const EVENT = require('../models/event')

// Check Event ID Not In Use
router.post('/checkEventId', (req,res)=>{ // 13
    if (req.body.eventID == null || req.body.eventID == '') {
        res.json({success:false, message: 'No Event ID Entered' });
    } else {
        
    }
});

router.post('/createNewEvent', (req,res)=>{

})

module.exports = router;