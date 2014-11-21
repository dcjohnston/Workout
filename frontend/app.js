var app = angular.module('app', ['ngAnimate']);

app.controller('MainCtrl', ['$timeout', function($timeout){
  this.displayNavbar = false;
  this.toggleNavbar = function(){
    this.displayNavbar = !this.displayNavbar;
  }
  this.displayModal = false;
  this.templateUrl = ''; // default
  this.toggleModal = function(name){
    if (name === 'login'){
      this.templateUrl = '/frontend/partials/login.html';
    } else if (name === 'signup') {
      this.templateUrl = '/frontend/partials/signup.html';
    }
    var self = this;
    $timeout(function(){
      self.displayModal = !self.displayModal;
    }, 0);
  }
}]);


// IS THIS SECURE ?!?!?!?
app.directive('modal', function($http, $templateCache){
  return {
    restrict: 'E',
    scope: {
      contentUrl: '=',
      showCondition: '=',
      fadeDuration: '=',
    },
    templateURL: "/frontend/partials/modaltemplate.html",
    link: function(scope, ele, attr){
      var templateUrls = scope.$eval(attr.templates);
      angular.forEach(templateUrls, function(value, key){
        $http.get(value, {cache: $templateCache})
        .success(function(){
          console.log('did it');
        });
      });
      scope.disableModal = function (){
        scope.showCondition = false;
      }
      scope.$watch('contentUrl', function(newValue, oldValue){
      });
      scope.$watch('showCondition', function(newValue, oldValue){
        if (newValue) {
          //show contents
          ele.css({"visibility": "visible"});
          angular.element(".my-modal-backdrop").addClass('show-modal-backdrop');
          angular.element(".my-modal-dialog").addClass('show-modal-dialog');
        } else {
          //hide contents
          ele.css({"visibility": "hidden"});
          angular.element(".my-modal-backdrop").removeClass('show-modal-backdrop');
          angular.element(".my-modal-dialog").removeClass('show-modal-dialog');
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
