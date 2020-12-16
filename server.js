// **** Node JS Server.
const HTTP = require('http')
const express = require ('express'); 
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express(); 
const SERVER = HTTP.Server(app);
// **** Port Variables
const hostname = 'localhost';
const PORT = process.env.PORT || 8080;
const dbURI = process.env.MONGODB_URI || require('./API/config/database').uri;


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
// **** Database Connection
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err){
      console.log('DataBase Connection Error :', err);
  } else {
      console.log('Successfully Connected to Database : ',dbURI);
  }
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

const Auth_Routes = require('./api/routes/auth')
const Event_Routes = require('./api/routes/event')
const SONG_Routes = require('./api/routes/song')
const TEAM_Routes = require('./api/routes/team')
const USER_Routes = require('./api/routes/user')
// **** Router routes
app.use('/api/auth', Auth_Routes);
app.use('/api/event', Event_Routes);
app.use('/api/songs', SONG_Routes);
app.use('/api/team', TEAM_Routes);
app.use('/api/user', USER_Routes);
// **** Main routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
// **** Start Server
SERVER.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});
