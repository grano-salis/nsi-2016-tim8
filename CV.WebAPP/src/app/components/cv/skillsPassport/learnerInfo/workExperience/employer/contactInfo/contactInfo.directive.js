(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('employerContactInfo', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/workExperience/employer/contactInfo/contactInfo.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope) {
      $scope.odabrani = $scope.model;

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
