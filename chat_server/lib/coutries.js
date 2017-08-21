
var countryModel = {
  countries: (function(){
      return require('../files/countries.json'); 
  }())
};

module.exports = countryModel; 