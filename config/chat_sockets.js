module.exports.chatSockets = function(socketServer){
     let io = require('socket.io')(socketServer);

     io.sockets.on('connection', function(socket){
         console.log('new connection recieved', socket.id);
        
        
         socket.on('disconnect',function(){
             console.log('socket disconnected');
         });

         socket.on('join_room', function(data){
            console.log('joining request recieved', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
         })
        socket.on('send_message', function(data){
        io.in(data.chatroom).emit('recieve_message', data);

     });
    });
}