const express = require('express');
const router  = express.Router();
const USER = require('../models/user')

// Create New USER
router.post('/createNewOperator', (req,res)=>{ // 13
    if (req.body.userID == null || req.body.userID == '') {
        res.json({success:false, message: 'No User ID Entered' });
    } else if (req.body.name == null || req.body.name == '') {
        res.json({success:false, message: 'No Name Entered' });
    } else if (req.body.password == null || req.body.password == '') {
        res.json({success:false, message: 'No Password Entered' });
    } else if (req.body.token == null || req.body.token == '') {
        res.json({success:false, message: 'No Admin Token Entered' });
    } else {
        var user = new USER({
            userID:req.body.userID,
            name:req.body.name,
            password:req.body.password,
            admin:req.body.token
        });
        user.save((err)=>{
            if (err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                res.json({ success:true, user: user });
            }
        });
    }
});

module.exports = router;