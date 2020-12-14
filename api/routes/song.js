const express = require('express');
const router  = express.Router();

router.get('/getSongs', (req,res) =>{
    res.json( {success:true, data : [
        {id:'0A1', artist:'Neil Diamond', title:'Sweet Caroline'},
        {id:'0B2', artist:'Journey', title:"Don't Stop Believin'"},
        {id:'0C3', artist:'Queen', title:'Bohemian Rhapsody'},
        {id:'0D4', artist:'Oasis', title:'Wonderwall'},
        {id:'0E5', artist:'Frank Sinatra', title:'My Way'},
        {id:'0F6', artist:'the Ramones', title:'I Wanna Be Sedated'},
        {id:'0G7', artist:'R.E.M', title:'Losing My Religion'},
        {id:'0H8', artist:'Rick Astley', title:'Never Gonna Give You Up'},
        ]});
});
// router.post('/newRequest', (req,res)=>{
//     console.log('req request ', req.body)
//     io.of('/live').to('stocks').emit('newRequest',{success:true, request:req.body})
      
//     res.json({success:true, request:req.body})
//   })
  

module.exports = router;