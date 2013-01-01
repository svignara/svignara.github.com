var loadtweets = {
    loadit: function(username) {
        $.ajax({
            url: "https://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + username + "&count=10",
            dataType: "jsonp",
            timeout: 5000,
            success: function(data) {

                for (i = 0; i < data.length; i++) {
                    $("#data").append("<p>" + data[i].text) + "</p>";
                    $("#data").append("<p>" + data[i].created_at + "</p><hr />");

                }
                console.log('write');
            },
            error: function() {
                var self = loadtweets;
                loadtweets.eraseit();
                $("#data").append("Data could not be retrieved for that user");
            },
        });
    },
    eraseit: function() {
        $('#data').empty();
        console.log('erased');
    }
}

$(document).ready(function() {
    var username;
    var container = $("#tweets-container");
    $('#submit').on('click', function(e) {
        e.preventDefault();
        if (!container.hasClass('on')){
          container.addClass('on');
          console.log(container.html());
        }
        username = $("#name").val();
        if (username) {
          loadtweets.eraseit();
          loadtweets.loadit(username);
        } else {
          loadtweets.eraseit();
          $("#data").append("No username entered...");
        }
    });
})