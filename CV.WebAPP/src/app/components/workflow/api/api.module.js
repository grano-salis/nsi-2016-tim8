(function() {
  'use strict';

  angular
    .module('ea.api', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'Slidebox',
      'smoothScroll',
      'LocalStorageModule'//,
      // 'ea.account',
      // 'ea.cv'//,


    ]);

})();

(function(){
  "use strict";

  angular
    .module('ea.api')
    .service('apiService', apiService);

  /** @ngInject */
  function apiService($http,$q,localStorageService,loginService){
    var userComponents = null;
    var userDrafts = null;
    var currentUser = null;

    this.setUserComponents = function(components){
      userComponents = components;
    }
    this.setUserDrafts = function (components) {
      userDrafts = components;
    }
    this.getUserDrafts = function () {
      // if(currentUser == null){
      //   currentUser = loginService.getCurrentUser();
      // }
      debugger
      var obj={};
      var lsKeys = localStorageService.keys();
      var Key=null;
      angular.forEach(lsKeys,function (value,key) {
        if(value.indexOf('draft')>-1)
          Key=value;
      })
      if(Key!=null){
        return localStorageService.get(Key);
      }
      // var key = 'drafts-'+currentUser.id;
      // if(lsKeys.includes(key)){
      //   return localStorageService.get(key);
      // }
      return [];
    }
    this.getUserComponents = function () {
      if (currentUser == null) {
        currentUser = loginService.getCurrentUser();
      }
      var lsKeys = localStorageService.keys();
      var key = 'components-' + currentUser.id;
      var rez = {};
      if (lsKeys.includes(key)) {
        rez = localStorageService.get(key);
      }
      userComponents = rez;
      return rez;
    }
    this.deleteDraft = function(userid,title){
      var lsKeys = localStorageService.keys();
      var Key=null;
      angular.forEach(lsKeys,function (value,key) {
        if(value.indexOf('draft')>-1)
          Key=value;
      })
      var trenutno = localStorageService.get(Key);
      var indez=-1;
      for(var i=0;i<trenutno.components.length;i++){
        if(title==trenutno.components[i].title){
          indez = i;
          //trenutno.components.splice(i,0);
          break;
        }
      }
      if(indez!=-1)
        trenutno.components.splice(indez,1);
      localStorageService.set(Key,trenutno);
    }
    this.getAllUserComponents = function () {
      var obj={};
      var lsKeys = localStorageService.keys();
      var Key=null;
      angular.forEach(lsKeys,function (value,key) {
        if(value.indexOf('componen')>-1)
          Key=value;
      })
      if(Key!=null){
        return localStorageService.get(Key);
      }
        return [];
      }
    this.saveUserComponents = function (userid,components) {
      if(components===null || typeof (components)=='undefined')
        components = userComponents;

      if(userid === null || typeof (userid)=='undefined'){
        currentUser = loginService.getCurrentUser();
        userid = currentUser.id;
      }

      // var lsKeys = localStorageService.keys();
      // //debugger;
      // if(lsKeys.includes('Identification')){
      //   $scope.Identification = localStorageService.get('Identification');
      //   $scope.pr.SkillsPassport.LearnerInfo.Identification = $scope.Identification;
      // }
      var obj={
        user:userid,
        components:components
      }
      var key = 'components-'+userid;
      localStorageService.set(key,obj);
    }
    this.saveUserDrafts = function (userid,components) {
      if(components===null || typeof (components)=='undefined')
        components = userDrafts;

      if(userid === null || typeof (userid)=='undefined'){
        currentUser = loginService.getCurrentUser();
        userid = currentUser.id;
      }

      debugger

      var a = userComponents;

      var obj={
        user:userid,
        components:components
      }
      var key = 'drafts-'+currentUser.id;
      localStorageService.set(key,obj);
    }
  }
})();