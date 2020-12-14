const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database').tokenKey
const USER = require('../models/user')

// USER LOGIN
router.post('/logIn', (req,res)=>{
    if (req.body.userID == null || req.body.userID == '') {
        res.json({success:false, message: 'No User ID Entered' });
    } else if (req.body.password == null || req.body.password == '') {
        res.json({success:false, message: 'No Password Entered' });
    } else {
        USER.findOne({userID:req.body.userID})
        .select('_id userID name password admin')
        .exec(function(err,user){
            if (err) {
                res.status(401).send({ message: 'DB Error : ' + err });
            } else {
                if (!user){
                    res.json({success:false, message: 'Invalid User ID !' });
                } else {
                    let validPassword = user.comparePassword(req.body.password);
                    if (!validPassword){
                        res.json({success:false, message: 'Invalid Password' }); 
                    } else {
                        let userJson = {
                            id:user._id,
                            userID:user.userID,
                            name:user.name,
                            admin:user.admin}  
                        let token = jwt.sign(userJson, config );
                        console.log('Succcess .... ', token)
                        res.json({
                            success:true,
                            user:userJson,
                            token:token});
                    }
                }
            }
        }
    );
    }
});

module.exports = router;