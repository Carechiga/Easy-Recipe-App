var radnomMealCard = document.querySelectorAll(".random-meal")
var randomMealImg = document.querySelectorAll(".random-meal-img")
var randomMealTitle = document.querySelectorAll(".random-meal-name")


function randomMealDisplay(){
    fetch("https://www.themealdb.com/api/json/v2/9973533/randomselection.php")
.then(function(response){
    return response.json()})
    .then(function(data){
        console.log(data);
       
        for(var i = 0; i < 3; i++){
            randomMealImg[i].src = data.meals[i].strMealThumb;
            randomMealTitle[i].textContent = data.meals[i].strMeal;
        }
   });
}

randomMealDisplay();