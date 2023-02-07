function randomMealDisplay(){
    fetch("https://www.themealdb.com/api/json/v2/9973533/randomselection.php")
.then(function(response){
    return response.json()})
    .then(function(data){
        console.log(data);
       
   });
}

randomMealDisplay();