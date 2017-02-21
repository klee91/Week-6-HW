var topics = ["Drake","Rihanna", "Adele", "Katy+Perry", "Bruno+Mars", "Chance+the+Rapper", 
			  "Lady+Gaga", "Usher", "Justin+Timberlake", "Yuna", "John+Mayer", "Iamsu!", 
			  "Sam+Smith", "Beyonce", "Justin+Bieber"];

function renderButtons() {
	for (var i =0;i < topics.length ; i++) {
		var artistBtn = $("<button>");
		artistBtn.addClass("new-artist").attr("data-artist", topics[i]).text(topics[i]);
		artistBtn.appendTo("#musicButtons");
	}
}

$(document).on("click", "#musicButtons", function() {
	var searchArtist = $(this).attr('data-artist');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchArtist + "&api_key=dc6zaTOxFJmzC" 
	
	$.ajax({
		URL: queryURL,
		method: "GET"
	//list every gif of artist search term to the body from GIPHY
	}).done(function(response){
		$('body').html("<img src=" + response[0].url + ">")
	});

});

$('#addArtist').on('click', function(event) {
	event.preventDefault();

	//global declaration of artist here
	var userArtist = $('#musicInput').val().trim().split(/[ ,]+/).join('+');
	topics.push(userArtist);
	$("#musicButtons").empty();
	renderButtons();
});

renderButtons();