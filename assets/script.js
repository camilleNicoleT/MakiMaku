
var movieList = document.querySelector('.movie-list');
var generateBtn = document.querySelector('#btn');     
var genre = '';


var getMovies = function() {
 var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=1a546d3d450a8b39075fa9e7e9e4d391&language=en-US&include_adult=false&page=1&with_genres=' 
  + genre;
  
  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      // console.log(response);
      response.json().then(function (data) {
       var results = data.results;
          console.log(results);
          displayMovies(results);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
    .catch(function (error) {
      alert('Unable to connect to The Movie Database');
    });
  var displayMovies = function(results) {
      
    for (var i = 0; i < 5; i++) 
  
        // var movieEl = document.createElement('ul');
  
        var title = results[i].title
  
        console.log(title);
      
        var titleEl = document.createElement('li');
  
        titleEl.innerHTML = title
  
        console.log(titleEl);
  
        movieList.appendChild(titleEl);
  
        // movieList.append(movieEl);
     },
    }

  
displayMovies(results),

// function loadDateIdeas() {
 
//   for(var i = 0; i < 10; i++){
  
//     var dateKey = radio.value;
//     var savedDate = localStorage.getItem(dateKey);
//     console.log(savedDate);
  
//   document.getElementById(dateKey) = savedDate;
//   }
//   }
//   loadDateIdeas();
 


document.getElementById('btn').onclick = function() {
  var radios = document.getElementsByName('genre');
  
  for (var radio of radios)
  {
      if (radio.checked) {
        genre = JSON.stringify(radio.value);
       }
      
    }
    getMovies(genre);
  }