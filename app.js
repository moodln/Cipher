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

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/groups", groups);
app.use("/api/invites", invites);
app.use("/api/documents", documents);
app.use("/api/problems", problems);

const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST' ]
    } 
})
let connectedUsers = [];
io.on("connection", socket => {
  console.log("User online");
  connectedUsers.push(socket.id);
  socket.broadcast.emit('currentUsers', {userIds: connectedUsers});

  // if server receives event with name "canvas-data", 
  // message will be broadcast to all other connected users
  socket.on("canvas-data", data => {
    socket.broadcast.emit("canvas-data", data);
  })

  // socket.on('join', (data) => {
  //   socket.join(data.username)
  // })

  // grab socked id and apply it to client-side
  // socket.emit('localId', socket.id)

  // socket.on('call', (data) => {
  //   // the person we want to call, userToCall is passed in from frontend
  //   io.to(data.toUsername).emit('call', {
  //       signal: data.signalData, 
  //       from: data.from, 
  //       name: data.name})
  // })


  // socket.on('answer', (data) => { 
  //   io.to(data.to).emit('callAccepted', data.signal)
  // })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    connectedUsers = connectedUsers.filter(user => user !==socket.id);
    socket.broadcast.emit('currentUsers', {userIds: connectedUsers});
    socket.broadcast.emit('callEnded')
  })
})



// const port = process.env.PORT || 3300;
httpServer.listen(process.env.PORT || 3300, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});