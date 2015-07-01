angular.module('SuviApp', [
    'SuviApp.controllers',
    'SuviApp.filters'
]);

angular.module('SuviApp.controllers', []).
controller('ProjectEntriesCtrl', [
  '$scope',
  function($scope){
    $scope.projects = projects;
  }
]).
controller('TabsCtrl', [
  '$scope',
  function($scope){
    $scope.tabs = tabs;
  }
]).
controller('BioCtrl', [
  '$scope',
  function($scope){
    $scope.bio = bio;
  }
]).
controller('SkillsCtrl', [
  '$scope',
  function($scope){
    $scope.skills = skills;
  }
]).
controller('NetworksCtrl', [
  '$scope',
  function($scope){
    $scope.networks = networks;
  }
]).
controller('ExperiencesCtrl', [
  '$scope',
  function($scope){
    $scope.experiences = experiences;
  }
]);

angular.module('SuviApp.filters', []).
filter('showAsHTML', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});