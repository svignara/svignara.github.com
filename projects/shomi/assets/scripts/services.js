'use strict';

var showcaseServices = angular.module('showcaseServices', []);

showcaseServices.factory('MovieService', ['$http', '$q',
    function ($http, $q) {

        return ({
            listMovies: listMovies
        });

        /* AJAX request to get list of movies, with success and error handlers */
        function listMovies() {
            var request = $http({
                method: 'get',
                url: 'data/feed.json'
            });
            return (request.then(handleSuccess, handleError));
        }

        function handleError(response) {
            return ({
                error: response.status + ' - ' + response.statusText
            });
        }

        function handleSuccess(response) {
            return (response.data.Data);
        }

    }
]);