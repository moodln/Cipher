const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
import firebase from 'firebase/app';
import 'firebase/firestore';

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

// initialize firebase with firestore credentials
const firebaseConfig = {
  apiKey: "AIzaSyA9eq5Qf5mwu18VGWRf3BsdJ0CpSxDLpw4",
  authDomain: "cipher-10559.firebaseapp.com",
  projectId: "cipher-10559",
  storageBucket: "cipher-10559.appspot.com",
  messagingSenderId: "630764971828",
  appId: "1:630764971828:web:121351f1f3babd43fee761",
  measurementId: "G-2LE2N5NM41"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const http = require("http")
const httpServer = http.createServer(app);
// const io = require("socket.io")(httpServer);
const io = require("socket.io")(httpServer, {
  cors: {
    origins: ["http://localhost:3000", "https://cipher-mern.herokuapp.com/"],
    methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
  console.log("User online");

  // if server receives event with name "canvas-data", 
  // message will be broadcast to all other connected users
  socket.on("editor-data", data => {
    socket.broadcast.emit("editor-data", data);
  })

  // socket.on("disconnect", () => {
  //   console.log("User has disconnected");
  // })
})

const port = process.env.PORT || 3300;
httpServer.listen(process.env.PORT || 3300, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});