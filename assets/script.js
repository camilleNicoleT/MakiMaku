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
      
        var titleEl = document.createElement('li');
  
        titleEl.innerHTML = title;
  
        console.log(titleEl);
  
        movieList.appendChild(titleEl);
  
      
      }
    }
}


var getRestaurant = function(zipCode) {
  var url = "https://api.documenu.com/v2/restaurants/zip_code/"+ zipCode + "?key=915deb38ae10f2c114fc2fcabcffbddf"
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
    console.log(restaurant);

 
    var restaurantEl = document.createElement('li');

    restaurantEl.innerHTML = restaurant;

    console.log(restaurantEl);

    restaurantListEl.appendChild(restaurantEl);

  }

}
 
// function loadDateIdeas() {
 
//   for(var i = 0; i < 10; i++){
  
//     var dateKey = radio.value;
//     var savedDate = localStorage.getItem(dateKey);
//     console.log(savedDate);
  
//   document.getElementById(dateKey) = savedDate;
//   }
//   }
//   loadDateIdeas();}
 

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
    console.log(restaurantLoopStart, restaurantLoopEnd);

    getRestaurant(zipCode);
  } else {
    movieLoopStart = 0;
    movieLoopEnd = 5;
    console.log(movieLoopStart, movieLoopEnd);
    console.log(page);
    getRestaurant(zipCode);
  }

}