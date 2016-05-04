var userInteractions = (function(){
  
  return {
    
    init: function(){
      this.navigation();
      this.changeLocation();
    },
    
    navigation: function(){
      $('.continent').on('hover', function(){
        $(this).find('.areas').toggleClass('on');
      });
    },
    
    changeLocation: function(){
      $('#locations a').on('click', function(e){
        e.preventDefault();
        var selected = $(this);
  
        $('#locations').find('li.selected').removeClass('selected');
        console.log(selected.parent().parent());
        if (selected.parent().parent().hasClass('areas')) {
          selected.parent().addClass('selected');
          selected.parent().parent().parent().addClass('selected');    
        }else {
          selected.parent().addClass('selected');
        }
  
        var newRegion = selected.attr('id');
        var options = {
          backgroundColor: '#E8FBFF',
          region: newRegion,
          colorAxis: {minValue: 0,  color: 'green'},
          width:'986'
        };
  
        chart.draw(data, options);
      });
    }
  }

}());

$(document).ready(function(){
  userInteractions.init();
});
