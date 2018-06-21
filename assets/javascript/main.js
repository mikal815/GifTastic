$(document).ready(function(){
    console.log("working");
    var topics = ['guitars','cadillacs','hyenas','the singularity','surfing','street art','abandoned places'];

    var mkbtn = function(){
        $("#topics").empty();

        for (var i = 0; i < topics.length; i++) {

            var newButton = $("<button>");
            newButton.text(topics[i]);
            newButton.attr("data-type", topics[i]);
            $("#topics").append(newButton);
        }


    }

    var newTopic = function(){
        $("#submitButton").on("click", function(event){
            // prevent default behavior
            event.preventDefault();

            var theValue = $("#newInput").val();
            topics.push(theValue);

            mkbtn();
        });


    }

// Call the functions
mkbtn();
newTopic();


});