
var zipcodeInputEl = document.querySelector("#zip-input")
var userFormEl = document.querySelector("#restaurant-zip")
var restaurantListEl = document.querySelector("#restaurant-list")

// firm handler is the get user input (zip code)
// preventDefault prohibits the browser from refreshing the page when using the submit button

var formSubmitHandler = function(event){ 
  event.preventDefault()
  var zipCode = zipcodeInputEl.value.trim()

  if (zipCode) {
    getRestaurant(zipCode);
    zipcodeInputEl.value = "";
  } else {
    alert("please enter a zipcode")
  }
  console.log(zipCode)
};

var getRestaurant = function(zipCode) {
  var apiUrl = "https://api.documenu.com/v2/restaurants/zip_code/"+ zipCode + "?key=89a322aeccb5ab89c42ab8f70808d1f9"
  fetch(apiUrl)
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
  for (i = 0; i < 5; i++) {
    console.log();
    var restaurantName = document.createElement("li")
    restaurantName.textContent = restaurants.data[i].restaurant_name
    restaurantListEl.append(restaurantName)
  }

}


userFormEl.addEventListener("submit", formSubmitHandler)
var movieList = document.querySelector('.movie-list');
var generateBtn = document.querySelector('#btn');     
var genre;
var page = 1;
var zipInput = document.getElementById('zipcode-input').value;
var zipCodeId = document.getElementById('zipcode-input').getAttribute('id')
var genreKey = document.querySelector('span').getAttribute("id");

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
    

    for (var i = 0; i < 5; i++) {
  
        // var movieEl = document.createElement('ul');
        var title = results[i].title;
        
        console.log(title);
      
        var titleEl = document.createElement('li');
  
        titleEl.innerHTML = title;
  
        console.log(titleEl);
  
        movieList.appendChild(titleEl);
  
        // movieList.append(movieEl);       
      }
    }
}


// function paginated_fetch(
//   url = is_required('https://api.themoviedb.org/3/discover/movie?api_key=1a546d3d450a8b39075fa9e7e9e4d391&language=en-US&include_adult=false'),
//   page = 1,
//   previousResponse = []
// ) {
//   return fetch(`${url}&page=${page}&with_genres=`+genre) // Append the page number to the base URL
//     .then(response => response.json())
//     .then(newResponse => {
//       const response = [...previousResponse, ...newResponse]; // Combine the two arrays

//       if (newResponse.length !== 0) {
//         page++;
//        return fetch(url, page, response);
        
//       }
//      return response;
    //      });
//     console.log("responded");

 

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
  
  var radios = document.getElementsByName('genre');
  for (var radio of radios)
  
  {
      if (radio.checked) {
        
        genre = radio.value;

        console.log(genre);
       }
      }
  
 zipInput = document.getElementById('zipcode-input').value;
  JSON.stringify(zipInput);
  console.log(zipInput);

  zipCodeId = document.getElementById('zipcode-input').getAttribute('id')
 localStorage.setItem(zipCodeId, zipInput);

genreKey = document.querySelector('span').getAttribute("id");
  localStorage.setItem(genreKey, genre);
      // if(zipInput==null)
        

  getMovies();
  //getRestaurant();
  }
