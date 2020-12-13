var port = process.env.PORT;
var http = require('http');
var myServer = http.createServer(function (request, response) {
    response.writeHeader(200, {"Content-Type":"text/html"});
    response.write("<b>Hello</b> World...:!");
    response.end();
});
myServer.listen(port);
console.log("Use port http://localhost:"+port);