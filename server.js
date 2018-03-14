var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/static'));
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen((process.env.PORT || 8080)); 

var self = this;
var room;

self.board = [];
self.players = [{
"name":"kum",
"id":"1",
"color":"#800000",
"position":1,
"isActive":false
},
{
"name":"rushan",
"id":"2",
"color":"#FF0000",
"position":1,
"isActive":true
}];

for(x= 1 ; x <= 24 ; x++){
    var field= {
        players:[],
        id:x,
        transition:x       
    }
    self.board.push(field);
}

self.board[0].players = [1,2];
self.board[11].transition = 20;
self.board[15].transition = 2;


// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        self.room = room;
        console.log(self.board);
        io.sockets.in(self.room).emit('start', 
                   {id:0, 
                    type:'start',
                    message:{
                        'board':self.board,
                        'players':self.players
                    }
                });
        socket.join(room);
    });

    socket.on('message', function (msg) { 
        console.log(msg);
        io.sockets.in(self.room).emit('message', msg); 
    });

    socket.on('addUser', function (username) { 
        console.log(username);
        self.players.push({
            "name":username,
            "id":self.players.length+1,
            "color":"#800000",
            "position":1,
            "isActive":false
        })
        console.log(self.players);
    });


    socket.on('gridchange',function(data){
        console.log(data);
        //  var currentChance={
        //         currentPlayer:1,
        //         number:randomNum,
        //         room:room

        //      }

         var currentPlayer = self.players.filter(t => t.id ==data.currentPlayer)[0];
         var nextPosition = currentPlayer.position + data.number;
         console.log("**********") 
          console.log(nextPosition) 
           console.log( self.board.length) 
         if(nextPosition <= self.board.length ) {
         var newPosition = self.board.filter(t => t.id == nextPosition)[0];
         var currentPosition = self.board.filter(t => t.id == currentPlayer.position)[0];
        
        // remove player from the prev cell 
        var index=currentPosition.players.indexOf(data.currentPlayer);
        console.log("index-" + index)
        console.log(currentPosition)
        currentPosition.players.splice(index,1);
        currentPlayer.position = newPosition.transition ; 
        console.log("splice")
         
        console.log(currentPosition)
         

         
         currentPosition = self.board.filter(t => t.id == currentPlayer.position)[0];
         currentPosition.players.push(data.currentPlayer);

        io.sockets.in(self.room).emit('start', 
                   {id:0, 
                    type:'start',
                    message:{
                        'board':self.board,
                        'players':self.players
                    }
                });
         }

        //io.to(room_name).emit('chat message', msg);
    })
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