var radnomMealCard = document.querySelectorAll(".random-meal");
var randomMealImg = document.querySelectorAll(".random-meal-img");
var randomMealTitle = document.querySelectorAll(".random-meal-name");
var randomMealCard = document.querySelectorAll(".random-meal");
var featuredRecipes = document.getElementById("featured-recipes");



//this function retrieves images and names of random recipes from themealDB API
function randomMealDisplay(){
    fetch("https://www.themealdb.com/api/json/v2/9973533/randomselection.php")
.then(function(response){
    return response.json()})
    .then(function(data){
        console.log(data);
       
        for(var i = 0; i < 3; i++){
            randomMealImg[i].src = data.meals[i].strMealThumb;
            randomMealImg[i].setAttribute('data-id', data.meals[i].idMeal)
            randomMealTitle[i].textContent = data.meals[i].strMeal;
            randomMealTitle[i].setAttribute('data-id', data.meals[i].idMeal)
            randomMealCard[i].setAttribute('data-id', data.meals[i].idMeal);
            }
   });
}

//this function sets the selected meal's id to local storage
function storeMealId(idNumber) {
    localStorage.setItem("mealID", idNumber);
}

function randomMealNavigate(event){
var mealID = event.target.getAttribute('data-id');
storeMealId(mealID);

document.location.replace('./recipe-page.html');
}

randomMealDisplay();

featuredRecipes.addEventListener('click', randomMealNavigate);
