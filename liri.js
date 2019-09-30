// All the requires
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

// Variable for the first argument in the terminal
var whatToDo = process.argv[2];
var userInput = process.argv[3];

// Spotify call function
function spotifyThis(input) {
    spotify
        .search({ type: 'track', query: input, limit: 10 })
        .then(function (response) {
            console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
            console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
        })
        .catch(function (err) {
            console.log(err);
        });
}
function concertThis() {

}
function movieThis() {

}
function doWhatItSays() {

}

switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis(userInput);
        break;
    case "movie-this":
        movieThis(userInput);
        break;
    case "concert-this":
        concertThis(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays(userInput);
        break;

    default:
        break;
}