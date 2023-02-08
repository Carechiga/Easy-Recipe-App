
fetch("https://www.themealdb.com/api/json/v2/9973533/search.php?s=potatoes")
.then(function(response){
    return response.json()})
    .then(function(data){
        console.log(data);})
