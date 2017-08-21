const countryModel = require('./coutries');

var serverModel = {
    userCounter: 0,
    setUserName: function(){
        return 'User' + this.userCounter;
    },
    rooms: [],
    langUsers: [],
    countries: countryModel.countries,
    addUserLang: (lang) => {
        console.log(this);
         if (serverModel.langUsers.length) {
                        if(serverModel.langUsers.indexOf(lang) === -1) serverModel.langUsers.push(lang);   
                   } else serverModel.langUsers.push(lang); 
                   serverModel.userCounter++;
    }
};

module.exports = serverModel; 