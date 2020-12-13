// **** Node JS Server.
const HTTP = require('http')
const express = require ('express'); 
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); 
const SERVER = HTTP.Server(app);
// **** Port Variables
const hostname = 'localhost';
const PORT = process.env.PORT || 8080;


// **** Middleware 
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// **** Token Decode Middleware
app.use((req, res,next)=>{
    next();
});
// **** Socket IO Stuff
const io = require("socket.io")(SERVER, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    },
});
io.of('/live')
  .on('connection', socket =>{
  console.log('new connection');
  socket.on('joinStocksRoom', room =>{
    if(room=='stocks'){
      socket.join('stocks');
      io.of('/live').to('stocks').emit('newRequest',{success:true, request:{artist:'A-ha', title:'LOng Days'}})
    }
  })
})

const SONGRoutes = require('./api/routes/songs')
// **** Router routes
app.use('/api/songs', SONGRoutes);
// **** Main routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
// **** Start Server
SERVER.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});
