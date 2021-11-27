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


const http = require("http");
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
  
  cors: {
    origins: "*:*",//["http://localhost:3000", "https://cipher-mern.herokuapp.com/"],
    methods: ["GET", "POST"],
    
    }
});

// const { ExpressPeerServer } = require("peer");
// const peerServer = ExpressPeerServer(httpServer, {
// debug: true,
// });
// app.use("/peerjs", peerServer);

io.on("connection", socket => {
  // console.log("User online");

  // if server receives event with name "editor-data", 
  // message will be broadcast to all other connected users
  socket.on("editor-data", data => {
    socket.broadcast.emit("editor-data", data);
  })
  // socket.on("join-room", (groupId, userId) => {
  //   socket.join(groupId);
  //   console.log('joined groupß');
    
  //   socket.to(groupId).broadcast.emit("user-connected", userId);
  // });
});

const port = process.env.PORT || 3300;
httpServer.listen(port, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

