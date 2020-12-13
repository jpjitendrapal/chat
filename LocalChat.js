var net = require('net');
var server = net.createServer(function (socket) {
    socket.write("Socket working");
    socket.end();
});
server.listen(8000);