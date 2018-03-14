// var fs = require('fs')
//     , http = require('http')
//     , socketio = require('socket.io');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-type': 'text/html'});
//     res.end(fs.readFileSync(__dirname + '/index.html'));

// }).listen((process.env.PORT || 8080), function() {
//     console.log('Listening at: http://localhost:8080');
// });


var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/static'));
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen((process.env.PORT || 8080)); 

// attach Socket.io to our HTTP server


var self = this;
var room;

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        self.room = room;
        console.log(self.room);
        socket.join(room);
    });
    socket.on('message', function (msg) { 
        console.log(msg);
        io.sockets.in(self.room).emit('message', msg); 
    });
});



// now, it's easy to send a message to just the clients in a given room




// rooms = ['room123', 'room321']

// io.on('create', function(room) {
//         rooms.push(room);
//         socket.emit('updaterooms', rooms, socket.room);
// });

// io.listen(server).on('connection', function (socket) {
//     socket.on('message', function (msg) {
//         io.sockets.in(room[1]).emit('message', 'what is going on, party people?');
//         // do all the fucking things here
//         console.log('Message Received: ', 'what is going on, party people?');
//         //socket.broadcast.emit('message', msg);
//     });
// });