var app = angular.module('app', ['ngAnimate']);

app.run(function($window){
  angular.element($window).on('load', function(){
    angular.element('body').removeClass("preload");
  });
});

app.controller('MainCtrl', function(){
  this.displayNavbar = false;
  this.toggleNavbar = function(){
    this.displayNavbar = !this.displayNavbar;
  }
  this.displayModal = false;
  this.toggleModal = function(){
    this.displayModal = !this.displayModal;
  }
});

app.directive('modal', function(){
  return {
    restrict: 'E',
    scope: {
      contentUrl: '=',
      showCondition: '=',
    },
    replace: true,
    controller: function ($scope){
      $scope.disableModal = function (){
        $scope.showCondition = false;
      }
    },
    template: "<div class='my-modal-backdrop' ng-show='showCondition' ng-click='disableModal()'> <div ng-include='url'> </div> </div>",
  }
});

app.controller('NavbarCtrl', function(){
  this.displayExercise = true;
  this.displayWorkout = true;
  this.displayProfile = true;
  this.toggleSubmenu = function(name) {
    this[name] = !this[name];
    console.log(name, this[name]);
  }
});

app.directive('ulToggler', function(){
  return {
    restrict: 'A',
    transclude: true,
    template: "<div ng-transclude class='list-wrapper'></div>",
    scope: {
      toggleDisplay: '='
    }
    
  }
});
