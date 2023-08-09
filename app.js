require("dotenv").config();

const express = require("express");
const clubRoute = require("./routes/routes");
const mongoose = require("mongoose");
const { model1 } = require("./DB/db");
const ejs = require("ejs");
const homeRoute = require("./homeroute/home");
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')

const app = express();


app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret : process.env.AUTH,
    resave : true,
    saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use("/", homeRoute);
app.use("/clubs", clubRoute);


app.get('/' , (req,res)=>{
  res.render('home')
})

const port = process.env.PORT;
app.listen(port || 3000, () => {
  console.log(`server is running on ${port}`);
})
