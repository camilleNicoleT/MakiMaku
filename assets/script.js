
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
