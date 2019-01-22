const fs = require('fs');
const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    fs.createReadStream('AB.mp4').pipe(res)
  })
  .listen(3000,()=> console.log('server running at 3000'));

/*
http.createServer((req,res)=> {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
  }).listen(3000);*/
