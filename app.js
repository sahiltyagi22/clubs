require('dotenv').config()

const express = require('express')
const clubRoute = require('./routes/routes')
const mongoose = require('mongoose')
const users = require('./DB/db')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const app = express()

mongoose.connect("mongodb://127.0.0.1/GBU-clubs",{useNewUrlParser :true,useUnifiedTopology : true})

app.use(express.static("public"))
app.set('view engine' , 'ejs')






app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended :true}))
app.use('/clubs' , clubRoute )

app.get('/' , (req,res)=>{
    res.render('home')
})



app.get('/register', (req,res)=>{
    res.render('register')
})

app.get('/login' , (req,res)=>{
    res.redirect('/register')
})














const port = process.env.PORT
app.listen(port || 3000 , ()=>{
    
    console.log(`server is running on ${port}`);
})





