var topics = ["Drake","Rihanna", "Adele", "Katy Perry", "Bruno Mars", "Chance the Rapper", 
			  "Lady Gaga", "Usher", "Justin Timberlake", "Yuna", "John Mayer", "Iamsu!", 
			  "Sam Smith", "Beyonce", "Justin Bieber"];

//button rendering function
function renderButtons(searchTerm) {
	for (var i =0;i < topics.length ; i++) {
		artistBtn = $("<button>");
		artistBtn.addClass("new-artist").attr("data-artist", topics[i].split(/[ ,]+/).join('+')).text(topics[i]);
		
		artistBtn.attr("data-artist", searchTerm);
		
		artistBtn.appendTo("#musicButtons");
	}
}

//obtain artist input submission, display gifs for input
function obtainArtist() {
	displayArtistGifs($(this).attr('data-artist'));
}

//display gifs of music artists
function displayArtistGifs(searchArtist) {
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchArtist + "&api_key=dc6zaTOxFJmzC" 
	
	$.ajax({
		url: queryURL,
		method: "GET"
	//list every gif of artist search term to the body from GIPHY
	}).done(function(response) {
		$('#gif-view').empty();

		for (var i = 0; i < response.data.length ; i++) {
			var artistGif = $("<div>");
			artistGif.addClass("new-gif");
			artistGif.html("Rating : " + response.data[i].rating + "<br><img class='a' src=" + response.data[i].images.fixed_height_still.url + ">");
			artistGif.attr('still-gif', response.data[i].images.fixed_height_still.url);
			artistGif.attr('play-gif', response.data[i].images.fixed_height.url);
			artistGif.appendTo('#gif-view');
		}
	});
};

// click function for artist button
$(document).on("click", ".new-artist", obtainArtist);

$(document).on("click", ".a", function() {
	
	var clicks = $(this).data('clicks');
	if (!clicks) {
	  var startGif = $(this).parent().attr('play-gif');
	  $(this).attr('src', startGif);
	} else {
	  var stopGif = $(this).parent().attr('still-gif');
      $(this).attr('src', stopGif);
	}
	$(this).data('clicks', !clicks);	

});	

//add artist to a button into button list
$('#addArtist').on('click', function(event) {
	event.preventDefault();

	//declaration of artist here
	var userArtist = $('#musicInput').val().trim();
	topics.push(userArtist);
	searchTerm = $('#musicInput').val().trim().split(/[ ,]+/).join('+');

	$("#musicButtons").empty();
	renderButtons(searchTerm);

});

renderButtons();