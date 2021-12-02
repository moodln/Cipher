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
// app.use(cors());

let onlineUsers = [];

const addUser = (userId, socketId) => {
    if (!onlineUsers.some(user => user.userId === userId)) {
        onlineUsers.push({
            userId, 
            socketId
        })
    }
}

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)

}

const getUser = (userId)=> {
        return onlineUsers.find(user => user.userId === userId)
}

io.on("connection", socket => {
  
  // if server receives event with name "editor-data", 
  // message will be broadcast to all other connected users
  socket.on("join-editor", data => {
    socket.join(data.groupId)
  })
  socket.on("editor-data", (data) => {
    
    
    socket.broadcast.to(data.groupId).emit("editor-data", data);
  })
  socket.on("join-room", (data) => {

    socket.join(data.groupId);
    
    socket.broadcast.to(data.groupId).emit("user-connected", data);
  });

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendNotification", ({sender, receiver, group}) => {
    const receiverUser = getUser(receiver)
    // console.log('in send notification', 'sender:', sender, 'receiver:', receiver, 'group:', group, 'usersOnline:', onlineUsers)
    // console.log('receiverUser', receiverUser)
    socket.broadcast.emit("receiveNotification", {
      sender, 
      group
    })
  })

  socket.on("send-peer-data", (data) => {

    // socket.join(data.groupId);
    // console.log('sending peer data');
    
    socket.broadcast.to(data.groupId).emit("send-peer-data", data);
  });

  socket.on("connected-user-handle", (data) => {
    // console.log('connected user is sending their handle back');
    
    socket.broadcast.to(data.groupId).emit("connected-user-handle", data);
  });

  socket.on("user-disconnected", data => {
    removeUser(socket.id);
    // console.log('user disconnected');
    // console.log(`data in user disconnect: `, data);
    socket.broadcast.to(data.groupId).emit("user-disconnected", data);
    socket.leave(data.groupId)

  })
});





const port = process.env.PORT || 3500;
httpServer.listen(port, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


