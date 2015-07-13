'use strict';

var showcaseControllers = angular.module('showcaseControllers', []);

showcaseControllers.controller('MovieListCtrl', ['$scope', 'MovieService',
  function($scope, MovieService) {

    MovieService.listMovies()
      .then(function(movies){
        $scope.movies = movies;
        $scope.sortField = 'Item.Title';
        $scope.reverse = false;

        /* set up for pagination */
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        $scope.numberOfPages = Math.ceil($scope.movies.length/$scope.pageSize);
        $scope.pages = [];
        for (var i = 1; i <= $scope.numberOfPages; i++){
          $scope.pages[i-1] = i;
        }
      });

    $scope.selectedMovie = {};

    $scope.showMoreInfo = function($event, movie){
      $event.preventDefault();
      $scope.selectedMovie = movie;
      $('#more-info').modal('show');
    }

    $scope.setPage = function($event, page){
      $event.preventDefault();
      if ( page === 0 || ( page > Math.ceil(($scope.movies.length / $scope.pageSize)) ) ){
        return;
      }
      $scope.currentPage = page - 1;
      console.log($scope.currentPage, page)
    }

    /* detect if touch device to show touch message for UI */
    $scope.deviceIsTouch = ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);

  }
]);