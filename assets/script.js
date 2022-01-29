var genre = document.querySelector('#genre-input');
var movieList = document.querySelector('#movie-list');


var getMovies = function(genre) {
    var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=1a546d3d450a8b39075fa9e7e9e4d391&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=' + genre;
    
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayMovies(data, genre);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to The Movie Database');
    });
};

var displayMovies = function(genre) {

    for (var i = 0; i < data.length; i+4); 

}

displayMovies ()

getMovies()