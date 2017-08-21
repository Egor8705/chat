import clientModel from './user_model';

var model = {
    sendMessage: (text,socket) =>{
           let data = {
                name: clientModel.userName,
                message: text,
                room: clientModel.userRoom,
                lang: clientModel.lang
            };  
      socket.emit('message from client',data);
    },
    
    getMessage: (messList,data) => {
         if (data.language === clientModel.lang){
                
                messList.append($('<img />',{
                    src: 'img/' + clientModel.countries[data.originLang] + '.png',
                    title: data.originMessage
                }));
                messList.append($('<label />',{
                    text: data.userName + ':' + data.message 
                }));
                messList.append('<br>');
        }
    },    
    
    createLangList: (countryArray,elem,socket) => {
        for ( let key in countryArray){
              let li = $('<li />');
              li.append($('<img />',{
                  src: 'img/' + countryArray[key] + '.png',
                  alt: key
              }));
              li.append($('<label />',{
                  class: 'language',
                  lang: key,
                  text: countryArray[key],
                  click: function(ev){
                        let lang = $(this)[0].lang;
                        clientModel.lang = lang;
                        socket.emit('change user lang client',lang);
                        $('#language').text(clientModel.countries[lang]);
                        ev.stopPropagation();
                  }
              }));
             elem.append(li);
        };
    },
    
    updateRoomList: function(data,socket,Room){
                     data.forEach((room) => {         
                     Room.append($('<p />',{
                        text: room,
                        class: 'room-class',
                        click: function(ev){
                            if (room !== clientModel.userRoom){
                             let answer = {
                                   newRoom: room,
                                   leaveRoom: clientModel.userRoom
                                  }; 
                             socket.emit('change room from client',answer);
                            ev.stopPropagation();
                        }}
                }));
         }); 
    }
};

export default model;


