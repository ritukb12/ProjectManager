const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');
config = require('./DB');
logger = require ('./logger')

const taskRoute = require('./routes/task.routes');
const userRoute = require('./routes/user.routes');
const projectRoute = require('./routes/project.routes');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Cannot connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(logger);
app.use('/task', taskRoute);
app.use('/user', userRoute);
app.use('/project', projectRoute);

let port = process.env.PORT || 4000;

const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});

module.exports = app;