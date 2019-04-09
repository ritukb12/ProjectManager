var morgan = require ('morgan');
var fs = require ('fs');
var accessLogStream = fs.createWriteStream(('./logs.log'), {flags:'a'});
module.exports = morgan(':date[web] - :method - :user-agent - ":url" - :status :response-time(END)', 
{stream: accessLogStream})