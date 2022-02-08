var movieList = document.querySelector('.movie-list');
var generateBtn = document.querySelector('#btn');     
var genre;
var page = 1;
var movieLoopStart = 0;
var movieLoopEnd = 5;
var restaurantLoopStart = 0;
var restaurantLoopEnd = 5;
var genreKey = document.querySelector('span').getAttribute("id");
var movieButtonEl = document.querySelector("#movieBtnDiv");
var restBtnEl = document.querySelector("#restBtnDiv");
var zipCode;
var restaurantListEl = document.querySelector(".resturaunt-list");
var movieAnchor = document.querySelector(".movie-anchor");
var selectedMovie = document.querySelector("#selected-movie");
var selectedRestaurant = document.querySelector("#selected-restaurant");
var displayMovies = document.querySelector("#saved-movies");
var displaySavedRestaurants = document.querySelector("#saved-restaurant");
var movieToSave;
var restaurantToSave;
var savedMovies = [];
var savedRestaurants = [];



var getMovies = function() { 

 var apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=1a546d3d450a8b39075fa9e7e9e4d391&language=en-US&include_adult=false&page=${page}&with_genres=${genre}`;
//  + page[i] 
  console.log(apiUrl);
 
  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
       console.log(response);
      response.json().then(function (data) {
        console.log(data);
       var results = data.results;
        
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
    
    movieList.innerHTML = "";
    movieButtonEl.setAttribute("class", "show");


    for (var i = movieLoopStart; i < movieLoopEnd; i++) {
  

        var title = results[i].title;
        
        console.log(title);

        var titleAnchor = document.createElement('a');

        titleAnchor.setAttribute("onclick", `addMovieToCombo(${i})`);
        titleAnchor.setAttribute("id", "movie" + i);

        titleAnchor.innerHTML = title
      
        var titleEl = document.createElement('li');
  
        titleEl.appendChild(titleAnchor);
         
        console.log(titleEl);
  
        movieList.appendChild(titleEl);
        
      }
    }
}


var getRestaurant = function(zipCode) {
  var url = "https://api.documenu.com/v2/restaurants/zip_code/"+ zipCode + "?key=203c86a96cd38ae7e452611be7c2ff7e"
  fetch(url)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
      console.log(data)
      displayRestaurants(data)
      });
    }
  })
}

var displayRestaurants = function(restaurants){
  
  restaurantListEl.innerHTML = "";
  restBtnEl.setAttribute("class", "show");
  
  for (i = restaurantLoopStart; i < restaurantLoopEnd; i++) {
    
    var restaurant = restaurants.data[i].restaurant_name;

    var restaurantAnchor = document.createElement('a');

    restaurantAnchor.setAttribute("onclick", `addRestaurantToCombo(${i})`);
    restaurantAnchor.setAttribute("id", "rest" + i);
     
    restaurantAnchor.innerHTML = restaurant;

    var restaurantEl = document.createElement('li');

    restaurantEl.appendChild(restaurantAnchor);

    console.log(restaurantEl);

    restaurantListEl.appendChild(restaurantEl);

  }

}
 
document.getElementById('btn').onclick = function() {
 // event.preventDefault()
  
  var radios = document.getElementsByName('genre');
  for (var radio of radios)
    {
      if (radio.checked) {
        
        genre = radio.value;

        console.log(genre);
       }
      }
 
zipCode = document.getElementById('zip-input').value.trim();
   JSON.stringify(zipCode);
  console.log(zipCode);

 if (zipCode) {
  
  zipCode.value = "";
} else {
  alert("Please enter a zipcode")
}

  zipCodeKey = document.getElementById('zip-input').getAttribute('id')
 localStorage.setItem(zipCodeKey, zipCode);

genreKey = document.querySelector('span').getAttribute("id");
  localStorage.setItem(genreKey, genre);
 
        
  getRestaurant(zipCode);
  getMovies();

}

document.getElementById('moviebtn').onclick = function() {

  if (movieLoopEnd < 19) {
    movieLoopStart = movieLoopStart + 5;
    movieLoopEnd = movieLoopEnd + 5;
    console.log(movieLoopStart, movieLoopEnd);

    getMovies();
  } else {
    movieLoopStart = 0;
    movieLoopEnd = 5;
    page++;
    console.log(movieLoopStart, movieLoopEnd);
    console.log(page);
    getMovies();
  }

}

document.getElementById('restbtn').onclick = function() {

  if (restaurantLoopEnd < 24) {
    restaurantLoopStart = restaurantLoopStart + 5;
    restaurantLoopEnd = restaurantLoopEnd + 5;
    // console.log(restaurantLoopStart, restaurantLoopEnd);

    getRestaurant(zipCode);
  } else {
    movieLoopStart = 0;
    movieLoopEnd = 5;
    console.log(movieLoopStart, movieLoopEnd);
    // console.log(page);
    // getRestaurant(zipCode);
  }

}

var addMovieToCombo = function(id) {

    selectedMovie.innerHTML = "";
  
    console.log(id);

    movieToSave = document.getElementById("movie" + id).innerHTML;

    console.log(movieToSave);

    selectedMovie.innerHTML = movieToSave;

}

var addRestaurantToCombo = function(id) {

  selectedRestaurant.innerHTML = "";

  console.log(id);

  restaurantToSave = document.getElementById("rest" + id).innerHTML;

  console.log(restaurantToSave);

  selectedRestaurant.innerHTML = restaurantToSave;

}

document.getElementById('clearbtn').onclick = function () {

    selectedMovie.innerHTML = "";
    selectedRestaurant.innerHTML = "";
    console.log("cleared");

}

document.getElementById('savebtn').onclick = function () {

    if (movieToSave == null && restaurantToSave == null) {

      alert("Please select a Movie & Restaurant combo to save");

    } else if (movieToSave == null) {

      alert ("Please select a movie to save")

    } else if (restaurantToSave == null) {

      alert("Pleae select a restaurant to save")

    } else {

    savedMovies.push(movieToSave);  
    localStorage.setItem('movieArray', JSON.stringify(savedMovies));
    savedRestaurants.push(restaurantToSave);
    localStorage.setItem('restArray', JSON.stringify(savedRestaurants));
    console.log(savedRestaurants);
    renderIdeas();
    selectedMovie.innerHTML = "";
    selectedRestaurant.innerHTML = "";

    }
}

var renderIdeas = function() {

  displayMovies.innerHTML = ""
  displaySavedRestaurants.innerHTML = ""
  
  var Movies = JSON.parse(localStorage.getItem("movieArray"));
  var Restaurants = JSON.parse(localStorage.getItem("restArray"));
    
  for (var i = 0; i < Movies.length; i++) {

    savedMovieItem = document.createElement('li');

    savedMovieItem.innerHTML = Movies[i];

    console.log(savedMovieItem);

    displayMovies.appendChild(savedMovieItem);

  }
  
  for (var i = 0; i < Restaurants.length; i++) {

    savedRestItem = document.createElement('li');
   
    savedRestItem.innerHTML = Restaurants[i];
  
    console.log(savedRestItem);
  
    displaySavedRestaurants.appendChild(savedRestItem);    

  }

}


