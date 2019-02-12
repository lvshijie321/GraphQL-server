var express = require('express');
const routers = require('./config/router')
var app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'token']);
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
}); 
 

app.get('/RESTful/api1', (req, res) => require(`./router/${routers.find(item => item.url === '/RESTful/api1').map}`)(req, res));
app.post('/GraphQL/api2', require(`./router/${routers.find(item => item.url === '/GraphQL/api2').map}`) );
app.post('/GraphQL/page', require(`./router/${routers.find(item => item.url === '/GraphQL/page').map}`) );
app.post('/GraphQL/auth', require(`./router/${routers.find(item => item.url === '/GraphQL/auth').map}`) );

const port = 4000
app.listen(port, () => console.log(`Now browse to localhost:${port}/graphql`));
 
