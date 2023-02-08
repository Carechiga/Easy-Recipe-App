var mealID = localStorage.getItem('mealID');
var recipeName = document.getElementById('recipe-name');
var recipeImg = document.getElementById('recipe-img');
var ingredientList = document.getElementById('ingredient-list');
var ingredientItem = document.querySelectorAll('.ingredient-item');
var instructions = document.getElementById('instructions');


//loads recipe info using mealID stored in localStorage
function recipeDisplay(){
    fetch("https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + mealID)
.then(function(response){
    return response.json()})
    .then(function(data){
        console.log(data);
        var selectedMeal = data.meals[0];
        recipeName.textContent = selectedMeal.strMeal;
        recipeImg.src = selectedMeal.strMealThumb;
        var instructionsString = selectedMeal.strInstructions;
        var instructionsArray = instructionsString.split('.');
                
        for(var i = 0; i < 20; i++){
            ingredientItem[i].textContent = selectedMeal[`strMeasure` + (i + 1) ] + " " + selectedMeal[`strIngredient` + (i + 1)];
        }

        for(var i = 0; i < instructionsArray.length; i++){
            var instructionListItem = document.createElement('li');
            instructionListItem.textContent = instructionsArray[i];
            instructionListItem.classList.add('text-xl');
            instructions.appendChild(instructionListItem);
        }

    })
}
 
    recipeDisplay();