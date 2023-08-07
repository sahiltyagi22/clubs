const express = require('express')
const { Module } = require('module')
const users = require('./../DB/db')

const router = express.Router()


const clubList = ['music' , 'debate' , 'dance' , 'cultural']
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
    let user = new users({
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
.get((req,res)=>{
    const clubname = req.params.clubName
    if(isValidUser(clubname)){
        res.render('club' , {clubname : clubname})
    }else{
res.sendStatus(404)
    }
})






module.exports = router