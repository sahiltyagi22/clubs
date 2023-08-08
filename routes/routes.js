const express = require('express')
const { Module } = require('module')
const {model1 , model2} = require('./../DB/db')
const { json } = require('body-parser')
const { model } = require('mongoose')



const router = express.Router()

let clubData = new model2({
    clubName : "naya",
    description : "this is music club"
})

clubData.save()





const clubList = ['music' , 'debate' , 'dance' , 'cultural', "drama" , "sports"]

function isValidUser(userName) {
  const lowerCaseUserName = userName.toLowerCase();
  const check = clubList.includes(lowerCaseUserName);
  return check
}


router.route('/')
.get((req,res)=>{
   res.render('clubs')
})
.post(async(req,res)=>{
    let user = new model1({
        username : req.body.username,
         email :req.body.email,
         password :req.body.password
    })

    try {
        user = await user.save()
        res.send("details saved")
    } catch (error) {
        res.send("there is an error")
        console.log(error);
    }
   
})

router.route('/:clubName')
.get(async (req,res)=>{
     const clubName = req.params.clubName
     console.log(clubName);
    if(isValidUser(clubName)){
        let data = await model2.find({clubName : 'naya'}) 
        res.json(data)
    }else{
res.sendStatus(404)
    }
})






module.exports = router