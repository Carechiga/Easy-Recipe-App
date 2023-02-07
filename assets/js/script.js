fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
.then(function(response){
    return response.json()})
    .then(function(data){
        console.log(data);
    });