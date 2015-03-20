$(document).ready(function(){
  $('.connections a').tooltip();
  
  $('window').on('scroll', function(){
    $('[data-spy="scroll"]').each(function () {      
      var $spy = $(this).scrollspy('refresh')
    });
  });
  
  $('.control .btn-primary').on('click', function(){    
    //console.log('expand');
    var button = $(this);
    $('.experience .collapse').collapse('show');
    $('.control .btn-primary').toggleClass('on');
    $('.control .btn-danger').toggleClass('on');
  });
  
  $('.control .btn-danger').on('click', function(){    
    //console.log('collapse');
    var button = $(this);
    $('.experience .collapse').collapse('hide');
    $('.control .btn-danger').toggleClass('on');
    $('.control .btn-primary').toggleClass('on');
  });
  
  $('.experience-heading a').on('click', function(){
    var currEl = $(this).parent().next();
    var checker = currEl.hasClass('in') ? -1 : 1;   
    
    $('.experience .collapse').each(function(){
      if ($(this) != currEl && $(this).hasClass('in')){
        checker++;
      }
    });
    
    if (checker == 7 && $('.control .btn-primary').hasClass('on')){
      $('.control .btn-primary').toggleClass('on');
      $('.control .btn-danger').toggleClass('on');
    }
  });
  
});