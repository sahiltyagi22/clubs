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

module.exports = mongoose.model('users' , UserCredentials )