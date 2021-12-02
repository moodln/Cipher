const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

const users = require("./routes/api/users");
const groups = require("./routes/api/groups");
const invites = require("./routes/api/invites");
const documents = require("./routes/api/documents");
const problems = require("./routes/api/problems");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/groups", groups);
app.use("/api/invites", invites);
app.use("/api/documents", documents);
app.use("/api/problems", problems);

const { ExpressPeerServer } = require("peer");
const http = require("http");
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origins: ["http://localhost:3000", "https://cipher-mern.herokuapp.com/"],//"*:*"
    methods: ["GET", "POST"],
    transports: ['websocket'],
  }
});
const peerServer = ExpressPeerServer(httpServer, {
  debug: true,
  path: "/"
});
app.use("/peerjs", peerServer);


io.on("connection", socket => {
  console.log('socket online!!!');
  
  // if server receives event with name "editor-data", 
  // message will be broadcast to all other connected users
  socket.on("join-editor", data => {
    console.log('joining group editor');
    socket.join(data.groupId)
  })
  socket.on("editor-data", (data) => {
    
    
    // socket.join(data.groupId);
    socket.broadcast.to(data.groupId).emit("editor-data", data);
  })
  socket.on("join-room", (data) => {

    socket.join(data.groupId);
    
    socket.broadcast.to(data.groupId).emit("user-connected", data);
  });

  socket.on("send-peer-data", (data) => {

    console.log('sending peer data');
    console.log(`data: `, data);
    
    socket.broadcast.to(data.groupId).emit("send-peer-data", data);
  });
  socket.on("connected-user-handle", (data) => {

    console.log('connected user is sending their handle back');
    
    socket.broadcast.to(data.groupId).emit("connected-user-handle", data);
  });

  socket.on("user-disconnected", data => {
    console.log('user disconnected');
    console.log(`data in user disconnect: `, data);
    socket.broadcast.to(data.groupId).emit("user-disconnected", data);
    socket.disconnect()

  })
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});





const port = process.env.PORT || 3500;
httpServer.listen(port, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


