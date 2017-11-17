const express = require('express');
const fs = require('fs');
const csv = require('csvtojson')
const morgan = require('morgan')
const csvFilePath = ('server/log.csv')
const http = require('http')
const app = express();

app.use(morgan('dev'));

app.use((req, res, next) => {
  // write your logging code here
  var loggers =
    req.headers["user-agent"].replace(/,/g, " ") +
    "," +
    new Date().toISOString() +
    "," +
    req.method + 
    "," +
    "/" +
    "," + 
    "HTTP/" +
    req.httpVersionMajor +
    "." +
    req.httpVersionMinor +
    "," +
    res.statusCode;   
    var stringReturn = loggers + "\n";
    fs.appendFile("server/log.csv", stringReturn, err => {
        if (err) throw err;
        console.log(loggers);
        next();
    });  
});                                                                                                                                                                                                                         
 






  app.get('/', (req, res) => {
    // write your code to respond "ok" here
    res.send('Ok')

    //save user information to log file using fs

  });

  app.get('/logs', (req, res) => {
    var logsArray = []
    csv ({
        noheader: true, 
        headers: ["Agent", "Method", "Resource", "Status", "Time", "Version"]
    })
    .fromFile(csvFilePath)
    .on("json", jsonObj =>{
        logsArray.push(jsonObj);
    })
    .on("done", () => {
        res.json(logsArray)
    })
    // write your code to return a json object containing the log data here

  });


module.exports = app;
