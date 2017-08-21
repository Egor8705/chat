const needle = require('needle');
const token = require('google-translate-token');

var translator = {
     translate: (data,io,roomLang) => {
         roomLang.forEach((lang) => {
             var myUrl = 'https://translate.google.com/translate_a/single?client=t&sl=' + data.originLang + '&tl=';
             myUrl += lang;  
             myUrl += '&hl=ru&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&source=btn&ssel=0&tsel=0&kc=5&tk=';            
             token.get(data.message).then((code) => {
                    myUrl += code.value + '&q=';
                    let message = encodeURI(data.message);
                    myUrl += message;
                    needle.get(myUrl, (err, res) => {
                            if (err) throw err;
                            var answer = {
                                userName: data.userName,
                                message: res.body[0][0][0],
                                language: lang,
                                originLang: data.originLang,
                                originMessage: data.message
                            };
                            io.to(data.room).emit('message from server',answer);
                     });
              });
         });            
   }
};

module.exports = translator; 