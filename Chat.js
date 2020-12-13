var app = require('express')()
    , http = require('http').Server(app)
    , io = require('socket.io')(http)
    , portnumner =  5000
    , directory = process.cwd();
app.get('/', function (req, res) {
    res.sendFile(directory + '/Chat.html');
});

app.get('/chat', function (req, res) {
    res.sendFile(directory + '/Chat.html');
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        var address = socket.handshake.address.split('.');
        address = address[address.length - 1];
        msg = address + ": " + msg;
        io.emit('chat message', msg);
        console.log(msg);
    });
});

http.listen(portnumner, function () {
    console.log('listening on *: ' + portnumner);
    console.log("env port"+ process.env.PORT);
});

function DisplayObject(obj) {
    for (key in obj) {
        if (typeof obj[key] == "object") {
            DisplayObject(obj[key]);
        } else {
            console.log(key + ': ' + obj[key]);
        }
    }
}