
import clientModel from './user_model';
import model from './chat_model';
import $ from 'jquery';



$(() => {
     
    const socket = io.connect('http://127.0.0.1:5000');

    socket.on('enter',function(data){
    
         clientModel.countries = data.countries;
         model.createLangList(clientModel.countries,$('#langList'),socket);
                  
         $('#userName').text(data.name);
         clientModel.userName = data.name;
         clientModel.lang = navigator.language || navigator.browserLanguage;
         $('#language').text(clientModel.countries[clientModel.lang]);
    
          let rooms = data.rooms;
          model.updateRoomList(rooms,socket,$('#rooms'));
          
          socket.emit('lang user client',{name: clientModel.userName,lang: clientModel.lang});
});

    $("#sendMessage").on('click',(ev) => {
        ev.preventDefault();
        let text = $("#textMessage");
        model.sendMessage(text.val(),socket);
        text.val('');
});  

    socket.on('message from server',(data) => {
        model.getMessage($('#messages'),data);
});

     $('#changeRoomButton').on('click',(ev) => {
        ev.preventDefault();
        let roomName = $('#changeRoomInput').val();
        let data = {
            newRoom: roomName,
            leaveRoom: clientModel.userRoom
        };
        socket.emit('create and enter room from client',data); 
        $('#changeRoomInput').val('');
});

     socket.on('change room from server',(data) => {
        clientModel.userRoom = data;
        $('#roomName').text(data); 
    });
    
     socket.on('update room list',(data) => {
             $('.room-class').remove();
             model.updateRoomList(data,socket,$('#rooms'));    
     });  
 });