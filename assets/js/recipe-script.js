var mealID = localStorage.getItem('mealID');
var recipeName = document.getElementById('recipe-name');
var recipeImg = document.getElementById('recipe-img');
var ingredientList = document.getElementById('ingredient-list');
var ingredientArray = ['strIngredient1', 'strIngredient2', 'strIngredient3', 'strIngredient4','strIngredient5', 'strIngredient6', 'strIngredient7', 'strIngredient8', 'strIngredient9', 'strIngredient10', 'strIngredient11', 'strIngredient12','strIngredient13', 'strIngredient14', 'strIngredient15', 'strIngredient16','strIngredient17', 'strIngredient18', 'strIngredient19', 'strIngredient20',];

function recipeDisplay(){
    fetch("https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + mealID)
.then(function(response){
    return response.json()})
    .then(function(data){
        console.log(data);
        recipeName.textContent = data.meals[0].strMeal;
        recipeImg.src = data.meals[0].strMealThumb;

    for(var i = 0; i < ingredientArray.length; i++){
        var currentIngredient = ingredientArray[i];
        if(data.meals[0].currentIngredient !== ""){
            console.log(currentIngredient);
            var recipeListItem = document.createElement('li');
            recipeListItem.textContent = data.meals[0].currentIngredient;
            recipeListItem.append(ingredientList);
        }
    }
    })
}

    recipeDisplay();