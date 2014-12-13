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
                var user = {
                    email : $('#inputEmail').val();
                    pass : $('#inputPassword').val();
                }
                window.localStorage.setItem('user', JSON.stringify(user));
                $('body').addClass('signedup');
            });
        }
    }

    bucketlist.init();

})(jQuery);