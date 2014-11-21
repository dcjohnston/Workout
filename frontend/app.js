var app = angular.module('app', ['ngAnimate']);

app.controller('MainCtrl', ['$timeout', function($timeout){
  this.displayNavbar = false;
  this.toggleNavbar = function(){
    this.displayNavbar = !this.displayNavbar;
  }
  this.displayModal = false;
  this.templateKey = '';
  this.toggleModal = function(name){
    this.templateKey = name;
    this.displayModal = !this.displayModal;
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
    templateUrl: "/frontend/partials/modaltemplate.html",
    link: function(scope, ele, attr){
      var templateMap = {};
      var templateUrls = scope.$eval(attr.templates);
      angular.forEach(templateUrls, function(value, key){
        $http.get(value)
        .success(function(response){
          templateMap[key] = angular.element(response);
        });
      });
      scope.disableModal = function (){
        scope.showCondition = false;
      }
      scope.$watch('contentUrl', function(newValue, oldValue){
        angular.element('.my-modal-dialog').html(templateMap[newValue]);
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
