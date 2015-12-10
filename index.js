'use strict';
var express = require('express');
var querystring = require('querystring');
var request = require('request');
var parseString = require('xml2js').parseString;
var http = require('http');
var app = express();

var service = 'http://bigscreen-dev.cmet.ustc.edu.cn/cas-auth';
var casLoginBase = 'https://passport.ustc.edu.cn/login';
var casValidateBase = 'https://passport.ustc.edu.cn/serviceValidate'

var casLoginUrl = casLoginBase + '?' + querystring.stringify({service : service});
var validateObj = {
  service : service,
  ticket : ''
}
var casValidateUrl;

//serviceValidate?service={service}&ticket={ticket}

app.get('/',function(req,res){
  res.send('<a href="'+casLoginUrl+'">'+casLoginUrl+'</a>');
});


app.get('/cas-auth',function(req,res){
  var ticket = req.query.ticket;
  console.log('get ticket:',ticket);
  validateObj.ticket = ticket;
  casValidateUrl = casValidateBase + '?' + querystring.stringify(validateObj);
  console.log('Validating...');
  request({strictSSL:false, uri:casValidateUrl}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('got xml:', body);
      parseString(body, {explicitArray:false}, function (err, result) {
      //console.dir(result);
        if(result['cas:serviceResponse']['cas:authenticationSuccess']){
          var data = result['cas:serviceResponse']['cas:authenticationSuccess'];
          var user = data['cas:user'];
          var userDetail = data['attributes'];

          res.json({user:user,userDetail:userDetail});
          //TODO: create session
        }else{
          res.sendStatus(500);
        }

      });
    }else{
      console.error(error);
    }
  });

});


app.listen(80);

