//var restaurant = document.querySelector('#')
//var restuantList = document.querySelector("#resturaunt-list")




var getResturauntNames = function (){
  var zip_code="07652"
  var apiUrl = `https://api.documenu.com/v2/restaurants/zip_code//4072702673999819?key=6addf5878bbe137282f847567d27204d`


    fetch(apiUrl)
    .then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                displayResturaunts(data, resturaunt);
            });
        } else {
            alert('Error:' + response.statusText)
        }
    })
    .catch(function (error){
        alert('Unable to connect to Resturaunt Database')
    });
}

var displayResturaunts = function(resturaunt){

}

displayResturaunts(

)
getResturauntNames()