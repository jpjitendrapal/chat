﻿var http = require('http');
var myServer = http.createServer(function (request, response) {
    response.writeHeader(200, {"Content-Type":"text/html"});
    response.write("<b>Hello</b> World...:!");
    response.end();
});
myServer.listen(3000);
console.log("Use port http://localhost:3000");