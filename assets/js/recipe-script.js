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
        //takes instructions and splits them in to different items
        var instructionsString = selectedMeal.strInstructions;
        var instructionsArray = instructionsString.split('.');
        
        //builds ingredient list items and appends to page        
        for(var i = 0; i < 20; i++){
            if(selectedMeal[`strIngredient` + (i + 1)]){
            var ingredientListItem = document.createElement('li');
            ingredientListItem.textContent = selectedMeal[`strMeasure` + (i + 1) ] + " " + selectedMeal[`strIngredient` + (i + 1)];
            ingredientListItem.classList.add('text-4xl', 'border-2', 'p-2');
            ingredientList.appendChild(ingredientListItem);}
        }

        //builds instruction list item and appends to page
        for(var i = 0; i < (instructionsArray.length - 1); i++){
            var instructionListItem = document.createElement('li');
            instructionListItem.textContent = instructionsArray[i];
            instructionListItem.classList.add('text-4xl', 'border-2', 'p-2');
            instructions.appendChild(instructionListItem);
        }

    })
}
 
    recipeDisplay();