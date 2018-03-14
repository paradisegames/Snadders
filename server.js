var fs = require('fs')
    , http = require('http')
    , socketio = require('socket.io');
var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8080, function() {
    console.log('Listening at: http://localhost:8080');
});


// attach Socket.io to our HTTP server
io = socketio.listen(server);

var room = '';

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
    });
});

// now, it's easy to send a message to just the clients in a given room
io.sockets.on('message', function (msg) { 
    console.log(room);
    io.sockets.in(room).emit('message', msg); 
});



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