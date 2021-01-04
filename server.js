var app = require('express')()
    , http = require('http').Server(app)
    , io = require('socket.io')(http)
    , portnumner = process.env.PORT || 5000
    , directory = process.cwd();


    // app.use("/public", express.static(path.join(__dirname, 'public')));
    app.get('/chat', function(req, res){
        res.sendFile(directory+ "/Chat.html");
    });

    app.get('/chat', function (req, res) {
        res.sendFile(directory + '/Chat.html');
    });

    app.get('/new', function(req,res){
        res.send("This is a new connection");
    });

    app.get('/game/:id',function(req, res){
        console.log(req.params);
        res.sendFile(directory + "/multiPlayerGame/game.html");
    })

var connectedUsers={};

io.on('connection', function (socket) {
    var uName;
    // console.log(socket);
    console.log("===========================");
    console.log(socket.handshake);
    
    socket.on('nameEnter', function(msg){
        if(msg){
            uName = msg;    
        } else {
            let address = socket.handshake.address.split('.');
            address = address[address.length - 1];
            uName = address + parseInt(Math.random()*10000);
        }
        connectedUsers[uName] = socket;
        console.log(uName, ", entered in the room");
    });
    socket.on('chatMessage', function (msg) {
        io.emit('chatMessage', {
                        to: uName,
                        msg: msg
                    }
            );
        console.log(msg);
        console.log(socket.handshake);
    });
});

http.listen(portnumner, function () {
    console.log('listening on *: ' + portnumner);
    console.log("env port"+ process.env.PORT);
});