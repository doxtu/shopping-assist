var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");
var dotenv = require("dotenv").config();

const port = process.env.PORT || 8000;
var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.listen(port);