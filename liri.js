// All the requires
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// Axios NPM
var axios = require("axios");
// Moment NPM
var moment = require("moment");
// File Server core module
var fs = require("fs");
// Pushed to text file
let forText = [];

// Variable for the first argument in the terminal
var whatToDo = process.argv[2];
// The second argument that the user types in the terminal
var userInput = process.argv.slice(3).join(" ");

// Switch for first input by the user
switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "concert-this":
        concertThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        break;
}
// Spotify call function

// Default behavior
if (userInput === "") {
    userInput = "The Sign Ace of Base";
    spotifyThis(userInput);
}
{
    // Actual input behavior
    function spotifyThis(input) {
        spotify
            .search({ type: 'track', query: input, limit: 3 })
            .then(function (response) {
                // Reduce the amount of spiderwebbing
                var searching = response.tracks.items;
                // Console log the info from spotify object
                for (let i = 0; i < searching.length; i++) {
                    console.log(JSON.stringify(searching[i].name, null, 2));
                    console.log(JSON.stringify(searching[i].artists[0].name, null, 2));
                    console.log(JSON.stringify(searching[i].artists[0].album.external_urls.spotify, null, 2));
                    console.log(JSON.stringify(searching[i].artists[0].album.name, null, 2));
                    // Style the terminal
                    console.log(searching)
                    console.log("--------------------------------------------")
                }
            })
    }
}
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // Reduce the amount of spiderwebbing
            var searchBand = response.data;
            console.log("Loading concerts...");
            // Loop through concerts and log information
            for (let i = 0; i < searchBand.length; i++) {
                // Name
                console.log(searchBand[i].venue.name);
                // City
                console.log(searchBand[i].venue.city);
                // Country
                console.log(searchBand[i].venue.country);
                // Use moment for the date and format it
                console.log(moment(searchBand[i].datetime).format("MM/DD/YYYY"));
            }
        })
}
function movieThis() {
    // Default Mr. Nobody
    if (userInput === "") {
        userInput = "Mr. Nobody";
        console.log("If you haven't watched " + userInput + " then you should. It's on Netflix!");
        movieThis();
    }

    {
        var queryURL = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"

        // Axios request
        axios.get(queryURL).then(
            function (response) {
                console.log(input);
                // Reduce the amount of spiderwebbing
                var searchMovie = response.data;
                console.log(searchMovie.Title, searchMovie.Year, searchMovie.Rated, searchMovie.Ratings[1]["Value"], searchMovie.Country, searchMovie.Language, searchMovie.Plot, searchMovie.Actors);
            })
    }
}
function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.split(",");

        spotifyThis(data[1]);
    })
}