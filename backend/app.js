const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Thread = require('./models/thread');
const threadsRoutes = require('./routes/threads');
const myLibraryRoutes = require('./routes/myLibrary');
const userRoutes = require('./routes/user');
const groupsRoutes = require('./routes/groups');
const groupsLitsRoutes = require('./routes/groupsLits');
const groupsThreadsRoutes = require('./routes/groupsThreads');
const groupsResponsesRoutes = require('./routes/groupsResponses');
const followsRoutes = require("./routes/follows");

const methodOverride = require("method-override");
const cors = require("cors");

const config = require("./lib/config");

const fs = require('fs');

const app = express();


mongoose.connect(
  "mongodb+srv://hongshan:" + config.MONGO_ATLAS_PW + "@cluster0-p2c40.mongodb.net/test",
  { useNewUrlParser : true}
).then(()=> {
  console.log("Connected to the database")
}).catch(()=>{
  console.log("Connection failed")
});

//data base control



// Order of middlewares matters

// Parse the body of a request
app.use(bodyParser.json({
  limit: "50mb"
}));


app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

// allow /lits to be statically accessable
//app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/", express.static(path.join(__dirname, "./interpolate")));
app.use("/groups", express.static(path.join(__dirname, "./interpolate")));
app.use("/groups/join-a-group/:groupName/:groupId",
express.static(path.join(__dirname, "./interpolate")));

app.use("/groups/lits", express.static(path.join(__dirname, "./interpolate")));
app.use("/signup", express.static(path.join(__dirname, "./interpolate")));
app.use("/login", express.static(path.join(__dirname, "./interpolate")));
app.use("/signup/:groupId", express.static(path.join(__dirname, "./interpolate")));
app.use("/login/:groupId", express.static(path.join(__dirname, "./interpolate")));

app.use("/profile", express.static(path.join(__dirname, "./interpolate")));


// Set headers to avoid CORS error
// CORS = cross origin resourse sharing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/threads", threadsRoutes);
app.use("/api/myLibrary", myLibraryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/groups/lits", groupsLitsRoutes);
app.use("/api/groups/threads", groupsThreadsRoutes);
app.use("/api/groups/responses", groupsResponsesRoutes);
app.use("/api/follows", followsRoutes)
/*
app.use((req, res, next)=> {
	console.log("hello world");
  res.sendFile(path.join(__dirname, "./interpolate", "index.html"));
});
*/

module.exports = app;
