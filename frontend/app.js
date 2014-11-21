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
  this.templateUrl = '';
  this.toggleModal = function(name){
    if (name === 'login'){
      this.templateUrl = '/frontend/partials/login.html';
    } else if (name === 'signup') {
      this.templateUrl = '/frontend/partials/signup.html';
    }
    this.displayModal = !this.displayModal;
  }
});


// IS THIS SECURE ?!?!?!?
app.directive('modal', function(){
  return {
    restrict: 'E',
    scope: {
      contentUrl: '=',
      showCondition: '=',
      fadeDuration: '=',
    },
    template: "<div> <div class='my-modal-backdrop' ng-click='disableModal()'></div>  <div ng-include='contentUrl'> </div> </div>",
    link: function(scope, ele, attr){
      scope.disableModal = function (){
        scope.showCondition = false;
      }
      scope.$watch('showCondition', function(newValue, oldValue){
        if (newValue) {
          //show contents
          ele.css({"visibility": "visible"});
          angular.element(".my-modal-backdrop").addClass('show-modal');
        } else {
          //hide contents
          angular.element(".my-modal-backdrop").removeClass('show-modal');
          if (oldValue) ele.css({"visibility": "hidden"});
        }
      });
    }
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
