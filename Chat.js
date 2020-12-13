var app = require('express')()
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

io.on('connection', function (socket) {
    var uName;
    socket.on('nameEnter', function(msg){
        uName = msg;
        console.log(uName, ", entered in the room");
    })
    socket.on('chat message', function (msg) {
        var address = socket.handshake.address.split('.');
        address = address[address.length - 1];
        uName = uName || address;
        msg = uName + ": " + msg;
        io.emit('chat message', msg);
        console.log(msg);
        // console.log(socket.handshake);
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