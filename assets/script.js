
var movieList = document.querySelector('.movie-list');
var generateBtn = document.querySelector('#btn');     
var genre = '';


var getMovies = function(genre) {
 var apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=1a546d3d450a8b39075fa9e7e9e4d391&language=en-US&include_adult=false&page=1&with_genres='
//  + page[i] 
  + genre;
 
  fetch(apiUrl)
  .then(function (data) {
    if (data.ok) {
       console.log(response);
      results.json().then(function (data) {
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
    

    for (var i = 0; i < 5; i++) 
  
        // var movieEl = document.createElement('ul');
        var title = results[i].title
        
        console.log(title);
      
        var titleEl = document.createElement('li');
  
        titleEl.innerHTML = title
  
        console.log(titleEl);
  
        movieList.appendChild(titleEl);
  
        // movieList.append(movieEl);       
     }
         
     displayMovies();
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
 


document.getElementById('btn').onclick = function(genre) {
  var radios = document.getElementsByName('genre');
  for (var radio of radios)
  {
      if (radio.checked) {
        genre = JSON.stringify(radio.value);
        console.log(genre);
       }
      }
  var zipInput = document.getElementById('zipcode-input').value;
  JSON.stringify(zipInput);
  console.log(zipInput);
  
  var zipCodeId = document.getElementById('zipcode-input').getAttribute('id')
  localStorage.setItem(zipCodeId, zipInput);

  var genreKey = document.querySelector('span').getAttribute("id");
  localStorage.setItem(genreKey, genre);
      if(zipInput==null)
        

  getMovies(genre);
  //getRestaurant();
  }