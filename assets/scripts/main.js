"use strict";

var suvi = (function($){

  return {

    init : function(){
      this.initUI();
    },
    initUI : function(){
      var self = this;

      $(function(){
        self.setActiveNav();
      });
    },
    setActiveNav : function(){
      var self = this,
          currentPath = location.pathname,
          activeNavItem = $('#navbar li[data-pageid="' + currentPath + '"]');

      if (activeNavItem){
        activeNavItem.addClass("active");
      }
    }

  }

})(window.jQuery);

suvi.init();