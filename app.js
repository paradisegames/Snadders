var fs = require('fs')
    , http = require('http')
    , socketio = require('socket.io');
var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8080, function() {
    console.log('Listening at: http://localhost:5050');
});

socketio.listen(server).on('connection', function (socket) {
    socket.on('message', function (msg) {

        // do all the fucking things here
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
});