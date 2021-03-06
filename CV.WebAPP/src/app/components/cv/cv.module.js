/* global toastr:false */
(function() {
  'use strict';

  angular
    .module('ea.cv', [
      'LocalStorageModule',
      'ui.bootstrap',
      'ngAnimate'
    ]);

})();

(function(){
  "use strict";

  angular
    .module('ea.cv')
    .service('xmlAssetsService', xmlAssetsService);

  /** @ngInject */
  function xmlAssetsService($http,$q){
    var url = 'assets/europass/xml.schema/';
    var xsdCountries = 'EuropassISOCountries_V1.6.0.xsd';
    var xsdNationalities = 'EuropassNationalities_V1.6.0.xsd';
    var xsdLanguages = 'EuropassISOLanguages_V1.8.0.xsd';
    var xsdNACEBusinessSector = 'NACE_COM_V1.0.0.xsd';
    var xsdOccupations = 'EuropassISCO_88_COM_V1.4.0.xsd';

    var getData = function(lang,xsd){
      var deferred = $q.defer();
      var get = $http({
        method: 'GET',
        url: url+xsd,
        transformResponse: function (data) {
          return angular.element(data);//.parseXML();
        }
      })
        .then(function(data){
          debugger;
          var niz=[];
          var drzave = data.data.find('xsd:enumeration');
          for(var i=0;i<drzave.length;i++){
            var elem = drzave[i];
            var label='';
            var kod = elem.attributes['value'].value;
            var elem2 = elem.children[0].children;
            for(var j=0;j<elem2.length;j++){
              var trenutni = elem2[j];
              if(trenutni.attributes['xml:lang'].value==lang){
                label=trenutni.innerHTML
                break;
              }
            }
            niz.push({Code:kod,Label:label});
            deferred.resolve(niz);
          }
        })
        .catch(function(data,status){
          debugger;
        })
        .finally(function () {

        })

      return deferred.promise;
    };

    //stavila sam da vraca EN jer zasad ne postoji prevedeno na HR jezik
    this.getOccupationsLangHR = function () {
      return getData('en',xsdOccupations);
    }

    this.getCountriesLangHR = function () {
      return getData('hr',xsdCountries);
    }

    this.getNationalitiesLangHR = function () {
      return getData('hr',xsdNationalities);
    }

    this.getLanguagesLangHR = function () {
      return getData('hr',xsdLanguages);
    }

    this.getNACEBusinessSectorLangHR = function () {
      return getData('hr',xsdNACEBusinessSector);
    }
  }
})();

(function(){
  "use strict";

  angular
    .module('ea.cv')
    .service('enumsService', enumsService);

  /** @ngInject */
  function enumsService($http,$q){
    var enums =[
      {Label:"honors_awards",Code:"honors_awards"},
      {Label:"publications",Code:"publications"},
      {Label:"presentations",Code:"presentations"},
      {Label:"projects",Code:"projects"},
      {Label:"citations",Code:"citations"},
      {Label:"memberships",Code:"memberships"},
      {Label:"conferences",Code:"conferences"},
      {Label:"seminars",Code:"seminars"},
      {Label:"workshops",Code:"workshops"},
      {Label:"references",Code:"references"},
      {Label:"signature_equivalent",Code:"signature_equivalent"},
      {Label:"courses",Code:"courses"},
      {Label:"certifications",Code:"certifications"}
    ]

    var exists = function (obj) {
      for(var i=0;i<enums.length;i++){
        if(enums[i].Label == obj || enums[i].Code == obj)
          return true;
      }
      return false;
    }

    this.get = function () {
      return enums;
    }

    this.merge = function(data){
      alert('merge');
      for(var i=0;i<data.length;i++){
        var t = data[i].criteria.name;
        debugger;
        if(!exists(t)){
          enums.push({Label:t,Code:t});
        }
      }
    }

  }
})();
