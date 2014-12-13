(function($){

    var bucketlist = {
        init : function(){
            this.initUI();
        },
        initUI : function(){
            var self = this;
            $(function(){
                self.initSignupUI();
                self.initLoginUI();
            });
        },
        initSignupUI : function(){
            var self = this;
            self.signupFormSubmitListener();
        },
        initLoginUI : function(){
            var self = this;
            self.loginFormSubmitListener();
        },
        signupFormSubmitListener : function(){
            $('form[name="signup"]').on('submit', function(evt){
                evt.preventDefault();
                var user = {
                    email : $('#inputEmail').val(),
                    pass : $('#inputPassword').val()
                }
                window.localStorage.setItem('user', JSON.stringify(user));
                $('body').addClass('signedup');
            });
        },
        loginFormSubmitListener : function(){
            var self = this;
            $('form[name="login"]').on('submit', function(evt){
                evt.preventDefault();
                if (!self.validUser($('#inputEmail').val(), $('#inputPassword').val())){
                    $(this).hasClass('has-error');
                    return false;
                }else{
                    window.location.href = "bucketlist.html";
                }
            });
        },
        validUser : function(email, pass){
            var user = (window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')) : { email : "", pass : "" };
            return (email === user.email && pass === user.pass);
        }
    }

    bucketlist.init();

})(jQuery);