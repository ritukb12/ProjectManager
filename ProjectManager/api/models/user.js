const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let User = new Schema({

    user_fname: {type :String } ,
    user_lname: {type :String } ,
    user_empID :  {type :String } 
},{
    collection: 'user'
});


    

module.exports = mongoose.model('User', User);