const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Task = new Schema({

    task_name: {type :String } ,
    //task_id: {type :Number },    
    parent_task_name: {type :String },
    start_date: {type :String },
    end_date: {type :String},
    priority: {type :String },
    taskended: {type : Boolean}
    
},{
    collection: 'task'
});


    

module.exports = mongoose.model('Task', Task);