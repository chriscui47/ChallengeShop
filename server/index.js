require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const appRoute = require("./routes/appRoute");
const app = express();
const PORT = process.env.PORT || 5000;
app.use("/api", appRoute);
mongoose
.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log("connected to mongo database"))
.catch((error) => console.error(error));

const cors = require('cors');
var bodyParser = require("body-parser");


app.use(cors());

  
  app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:5000', 'http://localhost:3000', 'https://relaxed-sinoussi-846966.netlify.app'];
    console.log("HEREEEEEEEEEE1");

    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    console.log("HEREEEEEEEEEE");
    console.log(origin);
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, application/json');
    res.header('Access-Control-Allow-Credentials', true);
  
    return next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  

app.listen(PORT, () => console.log(`listening on porht : ${PORT}`));

