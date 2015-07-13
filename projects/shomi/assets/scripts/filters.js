'use strict';

var showcaseFilters = angular.module('showcaseFilters', []);

showcaseFilters.filter('showImageType', function() {
	/* filter Image Array to find image of specified image type */
  return function(images, imgType) {
  	if (!images || !images.length){
  		return;
  	}
    for (var i = 0; i < images.length; i++){
    	if (images[i].Type === imgType){
    		return images[i].ImageId;
    	}
    }
  };
})
.filter('prettifyTime', function(){
	/* convert duration in seconds to pretty output: Hh MMm SSs */
	return function(runTime){
		if (!runTime){
			return;
		}
		var secondsInteger = parseInt(runTime, 10),
				hours = Math.floor(runTime / 3600),
    		minutes = Math.floor((runTime - (hours * 3600)) / 60),
    		seconds = runTime - (hours * 3600) - (minutes * 60);

    hours = hours + 'h';
    minutes = ( minutes < 10 ) ? '0' + minutes + 'm' : minutes + 'm';
    seconds = ( seconds < 10 ) ? '0' + seconds + 's' : seconds + 's';

    return ( hours + ' ' + minutes+ ' ' + seconds );
	}
})
.filter('startFrom', function() {
	/* set start index of array to be paginated */
  return function(list, start) {
  	if (!list || !list.length){
  		return;
  	}
    start = parseInt(start, 10);
    return list.slice(start);
  }
});