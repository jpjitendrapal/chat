﻿var app = require('express')()
    , http = require('http').Server(app)
    , io = require('socket.io')(http)
    , portnumner = process.env.PORT || 5000
    , directory = process.cwd();
app.get('/', function (req, res) {
    res.sendFile(directory + '/Chat.html');
});

app.get('/chat', function (req, res) {
    res.sendFile(directory + '/Chat.html');
});

app.get('/new', function(req,res){
    res.send("This is a new connection");
})

io.on('connection', function (socket) {
    var uName;
    socket.on('nameEnter', function(msg){
        uName = msg;
        console.log(uName, ", entered in the room");
    })
    socket.on('chatMessage', function (msg) {
        var address = socket.handshake.address.split('.');
        address = address[address.length - 1];
        uName = uName || address;
        msg = uName + ": " + msg;
        io.emit('chatMessage', msg);
        console.log(msg);
        // console.log(socket.handshake);
    });
});

http.listen(portnumner, function () {
    console.log('listening on *: ' + portnumner);
    console.log("env port"+ process.env.PORT);
});