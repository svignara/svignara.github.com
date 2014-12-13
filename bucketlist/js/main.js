(function($){

    var bucketlist = {
        init : function(){
            this.initSignupUI();
        },
        initSignupUI : function(){
            var self = this;
            $(function(){
                self.signupFormSubmitListener();
            });
        },
        signupFormSubmitListener : function(){
            $('form[name="signup"]').on('submit', function(evt){
                evt.preventDefault();
                console.log('submit data');
            });
        }
    }

    bucketlist.init();

})(jQuery);