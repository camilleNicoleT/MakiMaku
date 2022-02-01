var genre = document.querySelector('.genre-input');
var movieList = document.querySelector('.movie-list');


var getMovies = function(genre) {
    var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=1a546d3d450a8b39075fa9e7e9e4d391&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=' + genre;
    
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        // console.log(response);
        response.json().then(function (data) {
          // console.log(data);
          displayMovies(data.results);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to The Movie Database');
    });
};

var displayMovies = function(results) {

    for (var i = 0; i < 5; i++) {

        // var movieEl = document.createElement('ul');

        var title = results[i].title

        // console.log(title);

        var titleEl = document.createElement('li');

        titleEl.innerHTML = title

        // console.log(titleEl);

        movieList.appendChild(titleEl);

        // movieList.append(movieEl);
    }


}

var myHeaders = new Headers();
myHeaders.append("X-API-KEY", "89a322aeccb5ab89c42ab8f70808d1f9");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.documenu.com/v2/restaurants/zip_code/07652", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


getMovies("Comedy");