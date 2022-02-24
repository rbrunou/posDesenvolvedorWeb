//Este código deve estar no servidor, neste teste estava rodando no replit
//https://replit.com/@rbrunou/nodedb#index.js

const Database = require("@replit/database");
var http = require('http');
const db = new Database();
var json = [];

http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');

  res.writeHead(200, { 'Content-Type': 'application/json', 'mode': 'cors' });
  var dados = '{"":""}';
  req.on('data', function(data){
    dados = data;
  })
  req.on('end' ,function(){
    json = JSON.parse(dados);
  })

  let request = req.url.split('?');
  comando = request[0];
  request = req.url.split(':');
  let chave = request[1];
  json = JSON.stringify(json);

  if (comando == "/write"){   
    setKey(chave, json);
    getKeyValue(chave).then(
      function(value) {
        console.log(value + " => " + JSON.stringify(json));
        res.end(value);  
    })
  }

  if (comando == "/read"){   
    getKeyValue(chave).then((value) => res.end(value));
  }

  if (comando == "/delete"){
    deleteKey(chave);
    res.end("Deletado"); 
  }

  if (comando == "/list"){
    db.list().then(function (keys){
      res.end(JSON.stringify(keys));
    })
  }

}).listen(8080);

async function getKeyValue(key){
  let value = await db.get(key);
  return value;
}

async function deleteKey(key) {
  await db.delete(key).then(() => {});
}

async function setKey(key, value) {
  await db.set(key, value);
}