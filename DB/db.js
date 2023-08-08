const mongoose = require('mongoose')
const { stringify } = require('querystring')



const UserCredentials = new mongoose.Schema({
    username : {
        type : String,
        required : true
    }, 

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    }
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


let model1 = mongoose.model('users' , UserCredentials )
let model2 = mongoose.model('clubData' , clubdata )
module.exports = {
    model1,
    model2
}