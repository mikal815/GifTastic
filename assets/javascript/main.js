$(document).ready(function () {
    console.log("working");

    // Variables
    var topics = ['kermit', 'guitars', 'classic cars', 'hyenas', 'the singularity', 'surfing', 'street art', 'abandoned building'];

    // Functions
    var mkbtn = function () {
        $("#topics-display").empty();

        for (var i = 0; i < topics.length; i++) {

            var newButton = $("<button>");
            newButton.text(topics[i]);
            newButton.attr("data-type", topics[i]);
            newButton.attr("class", "giphy");
            $("#topics-display").append(newButton);
        }


    }

    var newTopic = function () {
        $("#submitButton").on("click", function (event) {
            // prevent default behavior
            event.preventDefault();

            var theValue = $("#newInput").val();
            topics.push(theValue);

            mkbtn();
        });


    }

    var renderGif = function () {
        var topicVal = $(this).data("type");

        var apiKey = 'j7miIKkaJdjHIRyIL7NZJ5zSe7Jv6Rhy';
        var apiUrl = 'http://api.giphy.com/v1/gifs/search?q=' + topicVal + '&api_key=' + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done(function (response) {

            $('.gifs').empty();

            for (var i = 0; i < 10; i++) {

                stillImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
                animateImgUrl = response['data'][i]['images']['fixed_height']['url'];

                var newImg = $('<img>');

                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animateImgUrl);
                newImg.attr('src', stillImgUrl);
                newImg.attr('data-name', 'still');
                newImg.addClass('gifImage');
                //Add gifs to DOM
                $('.gifs').append(newImg);
            }


        });


    }

    var animateGif = function () {

        gifState = $(this).data('name');
        gifStill = $(this).data('still');
        gifAnimate = $(this).data('animate');
        if (gifState === 'still') {

            $(this).attr('src', gifAnimate);

            $(this).data('name', 'animate');

        }
        else if (gifState === 'animate') {

            $(this).attr('src', gifStill);

            $(this).data('name', 'still');

        }
    }



    // Call the functions
    mkbtn();
    newTopic();
    // Event Delegation
    $(document).on("click", ".giphy", renderGif);
    $(document).on('click', '.gifImage', animateGif);



});