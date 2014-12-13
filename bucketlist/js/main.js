(function($){

    var map;

    var bucketlist = {
        init : function(){
            this.initUI();
        },
        initUI : function(){
            var self = this;
            $(function(){
                self.responsiveImg();
                self.initSignupUI();
                self.initLoginUI();
                if (location.href.indexOf('bucketlist.html') > -1){
                    self.getLocation();
                }
            });
        },
        responsiveImg : function(){
            var isMobile = window.matchMedia('(max-width:767px)').matches;
            $('.img-responsive').each(function(i){
                this.src = isMobile ? $(this).data('mobile') : $(this).data('desktop');
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
        getLocation : function (){
            var self = this;

            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(self.loadMap, self.loadMap);
            }else{
                console.log('browser does not support geolocation API and geolocation polyfill did not work..');
                self.loadMap();
            }
        },
        loadMap : function(loc){
            var self = bucketlist;

            var center = (loc) ? new google.maps.LatLng(loc.coords.latitude,loc.coords.longitude) : new google.maps.LatLng(43.7, -79.4);

            var mapOptions = {
                zoom: 8,
                center: center,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            self.mapUI();
        },
        mapUI : function(){

            var self = this;

            google.maps.event.addListener(map, 'click', function(e) {
                var marker = new google.maps.Marker({
                    position: e.latLng,
                    map: map
                });
                map.panTo(position);
            });

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
                    $(this).addClass('has-error');
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