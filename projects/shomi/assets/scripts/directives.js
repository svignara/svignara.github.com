'use strict';

var showcaseDirectives = angular.module('showcaseDirectives', []);

/* directive to populate alternative text for elements */
showcaseDirectives.directive('ngAlt', function() {
  return {
  	restrict : 'A',
  	scope : {},
  	link : function(scope, element, attrs){
  		element[0].alt = attrs.ngAlt ? attrs.ngAlt : '';
  	}
  }
});