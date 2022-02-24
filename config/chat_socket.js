
const Livemessage= require('../models/livemessage');

module.exports.chatSocket1= function(socketServer){
    // console.log("Here we are");
    const Server = require('socket.io');
    //It will be handling the connections
    let io = Server(socketServer, {
        // Fixing the cors issue
        cors: {
            origin: "http://13.233.20.78:8000"
        }
    })
    io.sockets.on('connection',function(socket){
        // console.log("New Connection received ",socket.id);

        socket.on('disconnect',function(){
            // console.log("Socket Disconnected to the server");
        })

        socket.on('join_room',function(data){
            console.log("Join_req ",data);
            socket.join(data.chatroom);

            // notification
            io.in(data.chatroom).emit('user_joined',data);
        })

        socket.on('send_message',function(data){
             Livemessage.create({
                 email:data.user_email,
                 message:data.message
             })
            io.in(data.chatroom).emit('receive_message',data);
        })

    })


}