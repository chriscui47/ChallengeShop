require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const appRoute = require("./routes/appRoute");
const app = express();
const PORT = process.env.PORT || 5000;
app.use("/api", appRoute);
const cors = require('cors');
const http = require('http');


var bodyParser = require("body-parser");

app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));



app.use(require('prerender-node').set('prerenderToken', 'G9I4sHcvwHe0Adk5VIz5'));
app.use(function(req, res, next) {
  var allowedOrigins = ['http://localhost:5000', 'http://localhost:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, application/json');
  res.header('Access-Control-Allow-Credentials', true);

  return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose
.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log("connected to mongo database"))
.catch((error) => console.error(error));
app.listen(PORT, () => console.log(`listening on port : ${PORT}`));