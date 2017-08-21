const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const serverModel = require('./chat_server/lib/server_model');
const translator = require('./chat_server/lib/translator');

const io = require('socket.io')(server);

server.listen( 5000,'127.0.0.1' );

app.use(express.static(path.join(__dirname, 'chat_client/public')));

app.get('/', function (req,res) {
    res.sendFile(__dirname + '/chat_client/public/index.html');
});

    
const Countries = serverModel.countries;
    
    io.on('connection',function(socket){
        
        socket.join('lobbyRoom');
        
        let dataUser = {
            name: serverModel.setUserName(),
            rooms: serverModel.rooms,
            countries:  Countries
        };
        
        socket.emit('enter',dataUser);
        
        socket.on('lang user client',(data) => {
                  serverModel.addUserLang(data.lang);
            });
               
        socket.on('message from client',(data) => {
            translator.translate({
                originLang: data.lang,
                message: data.message,
                userName: data.name,
                room: data.room
            },io,serverModel.langUsers);
        });
        
        
        socket.on('create and enter room from client',(data) => {
             socket.leave(data.leaveRoom);
             socket.join(data.newRoom);
             
             if (!serverModel.rooms.some((room) => {
                return room === data.newRoom;
            })) {serverModel.rooms.push(data.newRoom);
                  socket.emit('change room from server',data.newRoom);
                  io.emit('update room list',serverModel.rooms);}
        });
        
        socket.on('change room from client',(data) => {
             socket.leave(data.leaveRoom);
             socket.join(data.newRoom);
             
             socket.emit('change room from server',data.newRoom);
        });
        
        
        socket.on('change user lang client',(data) => {
           if (serverModel.langUsers.indexOf(data) === -1)
                  serverModel.langUsers.push(data);                
        });
});










