const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Project = new Schema({

    ProjectID: {type :String } ,
    //task_id: {type :Number },    
    Project_name: {type :String },
    start_date: {type :String },
    end_date: {type :String},
    priority: {type :String },
   
},{
    collection: 'project'
});


module.exports = mongoose.model('Project', Project);