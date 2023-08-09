
const mongoose = require('mongoose')
const { stringify } = require('querystring')
const mongooseSession = require('passport-local-mongoose')


mongoose.connect("mongodb://127.0.0.1/GBU-clubs",{useNewUrlParser :true,useUnifiedTopology : true}).then(()=>{
    console.log("connection is successful");
})

const UserCredentials = new mongoose.Schema({
    email : String,
    username : String,
    password : String,
   
})

const clubdata = new mongoose.Schema({
    clubName : {
        type : String,
        
    }, 

    description : {
        type : String,
       
    },

    members : {
        type : String,
    
    }
})

UserCredentials.plugin(mongooseSession)


let model1 = mongoose.model('users' , UserCredentials )
let model2 = mongoose.model('clubData' , clubdata )
module.exports = {
    model1,
    model2
}